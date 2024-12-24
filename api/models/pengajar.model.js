import mongoose from "mongoose";

const PengajarSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    kursus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kursus",
      },
    ],
  });
  
  export const Pengajar = mongoose.model("Pengajar", PengajarSchema);
  