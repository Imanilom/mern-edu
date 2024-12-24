import mongoose from "mongoose";

const KelasSchema = new mongoose.Schema({
    nama: { type: String, required: true }, // Nama kelas
    siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: "Siswa" }], // Siswa dalam kelas
    kursus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kursus" }], // Kursus dalam kelas
  });
  
  export const Kelas = mongoose.model("Kelas", KelasSchema);
  