export interface Ticket {
  _id?: string; // Making _id optional
  ticketType: string;
  username: string;
  title: string;
  company: string;
  position: string;
  domain: string;
  description: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}
