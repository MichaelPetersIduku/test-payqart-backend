import express from "express";
import mongoose from "mongoose";

const { connection } = mongoose;
const app = express();

export const connectMongo = () => {
  //Connnect to database here
};

connection.on("error", (error: any) => {
  console.log(`MongoDB database connection error: ${error}`);
  throw error;
});

connection.once("open", function () {
  app.locals.db = connection.db.collection("agendaJobs");
  console.log("MongoDB database connection opened successfully.");
});
