import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost/greennext");
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.log("Error while connecting. !!!", error);
  }
}
