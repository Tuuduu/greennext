import mongoose from "mongoose";

const feedbackScheme = mongoose.Schema({
  feedbackType: {
    type: String,
    require: [true, "Санал хүсэлтийн төрөл заавал оруулна."],
  },
  description: {
    type: String,
    require: [true, "Санал хүсэлтийн тайлбар хэсгийг заавал оруулна."],
  },
  title: {
    type: String,
    require: [true, "Санал хүсэлтийн гарчиг хэсгийг заавал оруулна."],
  },
  createdDate: {
    type: String,
    required: [true, "Үүссэн огноо заавал оруулна."],
  },
});

const feedbackTicket =
  mongoose.models["feedback"] || mongoose.model("feedback", feedbackScheme);

export default feedbackTicket;
