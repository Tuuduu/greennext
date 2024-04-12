import mongoose from "mongoose";

const ticketScheme = mongoose.Schema(
  {
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
    domain: {
      type: String,
      require: [true, "Компьютерийн дугаар заавал оруулна."],
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
  },
  {
    timestamps: true,
  }
);

const mtaTicket =
  mongoose.models[["mta-tickets"]] ||
  mongoose.model("mta-tickets", ticketScheme);

export default mtaTicket;
