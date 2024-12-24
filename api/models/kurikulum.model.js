import mongoose from "mongoose";

const KurikulumSchema = new mongoose.Schema({
  kelas: { type: Number, required: true }, // Contoh: 1, 2, 3
  kursus: [
    {
      namaKursus: { type: String, required: true },
      jadwal: {
        hari: { type: String, required: true }, // Contoh: Senin, Selasa
        jam: { type: String, required: true }, // Contoh: 08:00-10:00
      },
    },
  ],
});

export const Kurikulum = mongoose.model("Kurikulum", KurikulumSchema);
