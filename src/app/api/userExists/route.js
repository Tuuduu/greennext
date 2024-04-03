import { connectDB } from "@/library/mongoDB/connect";
import User from "@/models/userModel";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log();
  } catch (error) {}
}
