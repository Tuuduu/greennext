import { connectDB } from "./connect";
import user from "@/models/userModel";
import mtaTicket from "@/models/ticket/mtaTicketModel";

//// User data.
export const fetchUser = async () => {
  try {
    connectDB();
    const users = await user.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

//// Ticket data
export const fetchMtaTicket = async () => {
  try {
    connectDB();
    const result = await mtaTicket.find({});
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Mta tickets");
  }
};
