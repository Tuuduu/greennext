import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://172.19.10.27:27017/greennext");
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.log("Error while connecting. !!!", error);
  }
}