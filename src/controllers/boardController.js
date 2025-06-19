import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "POST from controller: API create a new board",
    });
    // throw new ApiError(StatusCodes.BAD_GATEWAY, "Dungdev test error");
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
