/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment.js";

//KHơi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chưa kết nối đến MongoDB)
let trelloDatabaseInstance = null;

//Khởi tạo một đối tượng MongoClient để kết nối đến MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Kết nối đến Database
export const CONNECT_DB = async () => {
  //Kết nối đến MongoDB
  await mongoClientInstance.connect();

  //Lấy cơ sở dữ liệu từ mongoClientInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Hàm để lấy đối tượng cơ sở dữ liệu đã kết nối
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    //Nếu đã khởi tạo, trả về trelloDatabaseInstance
    throw new Error("Database not initialized. Must connect to DB first.");
  }
  return trelloDatabaseInstance;
};

// Hàm để đóng kết nối đến MongoDB
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
