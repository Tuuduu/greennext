import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketType: {
      type: String,
      required: [true, "Дуудлагын төрөл заавал оруулна."],
    },
    username: {
      type: String,
      required: [true, "Хэрэглэгчийн нэр заавал оруулна."],
    },
    company: {
      type: String,
      required: [true, "Ажилладаг компани заавал оруулна."],
    },
    position: {
      type: String,
      required: [true, "Албан тушаал заавал оруулна."],
    },
    title: {
      type: String,
      required: [true, "Гарчиг заавал оруулна."],
    },
    domain: {
      type: String,
      required: [true, "Компьютерийн дугаар заавал оруулна."],
    },
    description: {
      type: String,
      required: [true, "Тайлбар заавал оруулна."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Утасны дугаар заавал оруулна."],
    },
    status: {
      type: String,
      required: [true, "Төлөв заавал оруулна."],
    },
    modifierUserName: {
      type: String,
      required: false, // Оруулалт албагүй
    },
    modifierUserId: {
      type: String,
      required: false, // Оруулалт албагүй
    },
    updatedDate: {
      type: String, // ISO форматад хадгалагдах тул төрөл нь Date
      required: [true, "Шинэчлэгдсэн огноо заавал оруулна."],
    },
    createdDate: {
      type: String, // ISO форматад хадгалагдах тул төрөл нь Date
      required: [true, "Үүссэн огноо заавал оруулна."],
    },
  },
  {
    timestamps: false, // createdAt, updatedAt автоматаар үүсгэхгүй
  }
);

const mtaTicket =
  mongoose.models["mta-tickets"] || mongoose.model("mta-tickets", ticketSchema);

export default mtaTicket;
