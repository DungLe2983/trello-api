/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "./config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  //enable req.json() data
  app.use(express.json());

  //Use api v1
  app.use("/v1", APIs_V1);

  //Middleware xử lý lỗi
  app.use(errorHandlingMiddleware);
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. BE-Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  exitHook(() => {
    console.log("4. Disconnecting from MongoDB Cloud Atlas...");
    CLOSE_DB();
    console.log("5. Disconnected from MongoDB Cloud Atlas");
  });
};

//Chỉ khi nào kết nối tới Database thành công thì mới khởi động server Backend lên
console.log("1. Connecting to MongoDB Cloud Atlas...");
CONNECT_DB()
  .then(() => {
    console.log("2. Connected to MongoDB Cloud Atlas");
  })
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error);
    process.exit(0); // Exit the process with failure
  });
