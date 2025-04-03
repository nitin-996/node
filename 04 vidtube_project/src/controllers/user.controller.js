import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Users } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiRespose } from "../utils/ApiResponse.js";

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

const userLogin = asyncHandler(async (req,res) =>{

const {username,email,password} = req.body



})

export { userRegister };
