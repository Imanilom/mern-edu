import mongoose from "mongoose";

const KursusSchema = new mongoose.Schema({
  nama: { type: String, required: true }, // Nama kursus
  totalPertemuan: { type: Number, default: 16 }, // Default 16 pertemuan
  jadwal: {
    hari: { type: String, required: true }, // Contoh: Senin
    jam: { type: String, required: true }, // Contoh: 08:00-10:00
  },
  pertemuan: [
    {
      nomor: { type: Number, required: true }, // Pertemuan ke-1, 2, dst.
      jenis: {
        type: String,
        enum: ["Reguler", "UTS", "UAS"],
        default: "Reguler",
      }, // Jenis pertemuan
      materi: { type: String }, // URL atau deskripsi materi
      tugas: {
        jenis: {
          type: String,
          enum: ["Text", "PDF", "File Lainnya"],
          required: true,
        }, // Jenis tugas
        deskripsi: { type: String, required: true }, // Penjelasan tugas
        filePath: { type: String }, // Path file (PDF atau lainnya)
        uploadDate: { type: Date, default: Date.now }, // Tanggal upload file tugas
      },
      nilaiTugas: [
        {
          siswaId: { type: mongoose.Schema.Types.ObjectId, ref: "Siswa" },
          nilai: { type: Number, min: 0, max: 100 },
          komentar: { type: String }, // Komentar atau feedback dari pengajar
          tanggalPenilaian: { type: Date }, // Tanggal tugas dinilai
        },
      ],
    },
  ],
  pengajar: { type: mongoose.Schema.Types.ObjectId, ref: "Pengajar" }, // Relasi ke pengajar
});

export const Kursus = mongoose.model("Kursus", KursusSchema);
