import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Users } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiRespose } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import mongoose from "mongoose";

const generateAccesandRefreshToken = async (userid) => {
  const user = Users.findById(userid);

  if (!user) {
    console.log("generating token error in user Controlller.");
    return "user is not found";
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const userRegister = asyncHandler(async (req, res) => {
  // destructured the data
  const { username, email, password, fullname } = req.body;

  console.log(username, email, password, fullname);
  // validation for data
  // used array some method BCZ it returns true or false as per use case.
  if (
    [username, email, password, fullname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // it will find user in database and return that user document
  const existedUser = await Users.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exists");
  }

  // handling image

  // console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverImage?.[0]?.path;

  // console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const avatar = await uploadToCloudinary(avatarLocalPath);
  console.log(avatar);

  let coverimage = "";

  if (coverimageLocalPath) {
    coverimage = await uploadToCloudinary(coverimageLocalPath);
  }

  // after doing all above steps now we can create user

  const user = await Users.create({
    username,
    email,
    password,
    fullname,
    avatar: avatar?.url,
    coverimage: coverimage?.url || "",
  });

  // here we fetch user from mongodb
  // and using select feature of mongodb we have excluded
  // two properties from document while fetching user using - sign.
  const createdUser = await Users.findById(user._id).select(
    "-password -refresToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "something went wrong while registering user");
  }

  res
    .status(200)
    .json(new ApiRespose(200, createdUser, "user has been created"));
});


// JWT token is saved in cookies at the time of login.
const userLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // validation

  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const loggedinUser = await Users.findOne({ $or: [{ username }, { email }] });

  if (!loggedinUser) {
    console.log("while login user is not found");
    return "user is not found";
  }

  // validating password
  const ispasswordCorrect = await Users.ispasswordCorrect(password);

  if (!ispasswordCorrect) {
    throw new ApiError(400, "Invalid credential");
  }

  const { accessToken, refreshToken } = await generateAccesandRefreshToken(
    loggedinUser._id
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookies("accessToken", accessToken, options)
    .cookies("refreshToken", refreshToken, options)
    .json(new ApiRespose(200, loggedinUser, "user loggedin successfully"));
});

// when access token expires , here we are using refreshtoken to issue new accessToken and refreshToken.
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Invalid access Token");
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.Refresh_Token_Secret
    );

    const user = await Users.findById(decodeToken?._id);

    if (!user) {
      throw new ApiError(400, "Invalid access Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(400, "Invalid access Token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccesandRefreshToken(user._id);

    return res
      .status(200)
      .cookies("accessToken", accessToken, options)
      .cookies("refreshToken", newRefreshToken, options)
      .json(
        new ApiRespose(
          200,
          { accessToken, newRefreshToken },
          "user access token successfully refresh "
        )
      );
  } catch (error) {
    throw new ApiError(400, "sth went wrong while refresing Token");
  }
});

const userLogout = asyncHandler(async (req, res) => {
  await Users.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookies("accessToken", options)
    .clearCookies("refreshToken", options)
    .json(new ApiRespose(200, {}, "user logged out sucessfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Users.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // ispasswordCorrect is a custom function which i have define in user model. check there to understand the work flow
  const isPasswordValid = await user.ispasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Old password does not match");
  }

  user.password = newPassword; // This is plain text — will be hashed in pre-save hook

  /*  ✅ await user.save({ validateBeforeSave: false }) — What does it do?

    This option disables Mongoose schema validation before saving the 
    document. Mongoose normally runs all your schema's validators (e.g., 
    required fields, email format, etc.) when calling .save(). This 
    option skips those validations.*/

  await user.save({ validateBeforeSave: false }); // ✅ triggers hashing

  return res
    .status(200)
    .json(new ApiRespose(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  //  here user id got from auth middleware

  const currentUser = await Users.findById(req.user._id).select(
    "-password -refreshToken"
  ); // hide sensitive fields

  if (!currentUser) {
    throw new ApiError(400, "Invalid details");
  }

  res
    .status(200)
    .json(
      new ApiRespose(200, currentUser, "Current user fetched successfully")
    );
});

// update details like fullname and email
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname || !email) {
    throw new ApiError(400, "Invalid details");
  }

  // “Find a user whose email is equal to the one the user is trying to update to
  //  — and whose _id is not the same as the currently logged-in user's _id.”
  const existingUser = await Users.findOne({
    email,
    _id: { $ne: req.user._id }, // Exclude current user from match
  });

  if (existingUser) {
    throw new ApiError(409, "Email already in use by another account");
  }

  const updatedUser = await Users.findByIdAndUpdate(
    req.user._id,
    { $set: { fullname, email } },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(new ApiRespose(200, updatedUser, "Details successfully updated"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // in this controller we use two middleware one is multer.middleware.js and second is auth.middleware.js
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file path not found");
  }
  let avatar;
  try {
    const uploadResponse = await uploadToCloudinary(avatarLocalPath);
    avatar = uploadResponse?.url;

    // Remove local file after successful upload
    fs.unlinkSync(avatarLocalPath);
  } catch (err) {
    throw new ApiError(500, "Error uploading avatar to Cloudinary");
  }

  if (!avatar) {
    throw new ApiError(400, "upload error");
  }

  const updatedUserAvatar = await Users.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(
      new ApiRespose(200, updatedUserAvatar, "avatar updated successfully")
    );
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  // in this controller we use two middleware one is multer.middleware.js and second is auth.middleware.js
  const coverimageLocalPath = req.file?.path;

  if (!coverimageLocalPath) {
    throw new ApiError(400, "cover image file path not found");
  }
  let coverImage;
  try {
    const uploadResponse = await uploadToCloudinary(coverimageLocalPath);
    coverImage = uploadResponse?.url;

    // Remove local file after successful upload
    fs.unlinkSync(coverimageLocalPath);
  } catch (err) {
    throw new ApiError(500, "Error uploading cover image to Cloudinary");
  }

  if (!coverImage) {
    throw new ApiError(400, "upload error");
  }

  const updatedUserCoverImage = await Users.findByIdAndUpdate(
    req.user._id,
    { $set: { coverImage } },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(
      new ApiRespose(200, updatedUserCoverImage, "avatar updated successfully")
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  // login as john
  // subscribing to janny
  // so in url we get janny
  // and that same janny name comes in username via req.param

  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing");
  }

  const channel = await Users.aggregate([
    // 1️⃣ Match the user document for "janny"
    {
      $match: {
        username: "janny", // passed from the frontend
      },
    },

    // 2️⃣ Who subscribed TO Janny?
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id", // Janny's _id
        foreignField: "channel", // in subscriptions, find all where channel == Janny
        as: "subscribers",
      },
    },

    // 3️⃣ Who is Janny subscribed to?
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id", // Janny's _id
        foreignField: "subscriber", // in subscriptions, where subscriber == Janny
        as: "subscribedTo",
      },
    },

    // 4️⃣ Add calculated fields
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers", // how many users subscribed to Janny
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo", // how many channels Janny is subscribed to
        },
        isSubscribed: {
          $cond: {
            // Check: Is John’s ID in the list of Janny’s subscribers?
            if: { $in: [req.user._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    // 5️⃣ Final output
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await Users.aggregate([
    // 1️⃣ Match the logged-in user by their _id
    {
      $match: {
        // here we are injecting user._id using auth middleware
        // in here in req user._id comes in string format
        // so we are converting it to mongodb BSON
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },

    // 2️⃣ Lookup videos from "videos" collection using watchHistory
    {
      $lookup: {
        from: "videos", // The collection to join
        localField: "watchHistory", // This is an array of video ObjectIds in the user document
        foreignField: "_id", // So this matches each video._id
        as: "watchHistory", // Final output field after lookup is 'watchHistory'

        // 3️⃣ Nested pipeline to further enrich each video with its owner's info
        pipeline: [
          {
            $lookup: {
              from: "users", // Lookup the owner (user who uploaded the video)
              localField: "owner", // owner field in video
              foreignField: "_id", // match to users._id
              as: "owner", // result of lookup is an array

              pipeline: [
                // We only need basic info from owner
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            // 4️⃣ Convert owner array (with one user) to object
            $addFields: {
              owner: { $first: "$owner" },
              // So instead of: owner: [ { fullName: "..."} ],
              // we get: owner: { fullName: "..." }
            },
          },
        ],
      },
    },
  ]);

  // 5️⃣ Return the watchHistory array from the first (and only) user document
  return res
    .status(200)
    .json(
      new ApiRespose(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
});

export {
  userRegister,
  userLogin,
  refreshAccessToken,
  userLogout,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
};
