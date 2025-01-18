import mongoose from "mongoose";

const ticketScheme = mongoose.Schema({
  ticketType: {
    type: String,
    require: [true, "Дуудлагын төрөл заавал оруулна."],
  },
  username: {
    type: String,
    require: [true, "Хэрэглэгчийн нэр заавал оруулна."],
  },
  company: {
    type: String,
    require: [true, "Ажилладаг компани заавал оруулна."],
  },
  position: {
    type: String,
    require: [true, "Албан тушаал заавал оруулна."],
  },
  title: {
    type: String,
    require: [true, "Гарчиг заавал оруулна."],
  },
  description: {
    type: String,
    require: [true, "Тайлбар заавал оруулна."],
  },
  phoneNumber: {
    type: String,
    require: [true, "Утасны дугаар заавал оруулна."],
  },
  status: {
    type: String,
    require: [true, ""],
  },
  modifier: {
    type: String,
    require: [false, ""],
  },
  createdDate: {
    type: String,
    require: [true, ""],
  },
});

const itaTicket =
  mongoose.models["ita-tickets"] || mongoose.model("ita-tickets", ticketScheme);

export default itaTicket;
