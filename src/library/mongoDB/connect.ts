import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/greennext");
    console.log("connected data base !!!");
  } catch (error) {
    console.log("Error while connecting. !!! ", error);
  }
}
