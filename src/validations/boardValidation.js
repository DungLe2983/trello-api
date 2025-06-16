import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async(req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).required().trim().strict(),
    description: Joi.string().min(3).max(256).required().trim().strict(),
  });

  try {
    console.log(req.body);
    //Chỉ định abortEarly: false để trả về tất cả các lỗi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
    res.status(StatusCodes.CREATED).json({
      message: "POST from validation: API create a new board",
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
