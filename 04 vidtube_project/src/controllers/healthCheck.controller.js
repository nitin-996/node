import { ApiRespose } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiRespose(200, "OK", "Health check is passed"));
});


export {healthCheck}