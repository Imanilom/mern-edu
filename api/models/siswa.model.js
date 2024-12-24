const SiswaSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    kelas: { type: Number, required: true }, // Contoh: 1, 2, 3
    kursusDiambil: [
      {
        kursusId: { type: mongoose.Schema.Types.ObjectId, ref: "Kursus" },
        progres: {
          pertemuanSelesai: { type: Number, default: 0 }, // Berapa pertemuan selesai
          tugasSelesai: { type: Number, default: 0 }, // Berapa tugas selesai
        },
      },
    ],
  });
  
  export const Siswa = mongoose.model("Siswa", SiswaSchema);
  