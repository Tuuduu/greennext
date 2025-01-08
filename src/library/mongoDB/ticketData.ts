import { connectDB } from "./connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";

//// Ticket data
export const fetchMtaTicket = async () => {
  try {
    connectDB();
    const tickets = await mtaTicket.find({});
    return tickets;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Mta tickets");
  }
};
