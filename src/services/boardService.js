/* eslint-disable no-useless-catch */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu tuy dac thu du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    //Goi toi Model de thuc hien thao tac voi CSDL
    const createdBoard = await boardModel.createNew(newBoard);
    // console.log("Created Board:", createdBoard);

    //Lấy bản ghi board sau khi tạo(tùy dự án)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    // console.log("Get New Board:", getNewBoard);

    return getNewBoard; // trong Service, luôn trả về dữ liệu đã được xử lý
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }
    return board;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
