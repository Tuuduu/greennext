import user from "@/models/userModel";
import { connectDB } from "./connect";
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
    const tickets = await mtaTicket.find({ status: "шинэ" });
    return tickets;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Mta tickets");
  }
};
