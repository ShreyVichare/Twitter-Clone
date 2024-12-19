import mongoose from "mongoose";
import dotenv from "dotenv";
const databaseConnection = () => {
  dotenv.config({
    path: "../.env",
  });
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default databaseConnection;
