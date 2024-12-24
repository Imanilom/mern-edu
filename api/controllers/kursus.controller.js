import { Kursus } from "../models/kursus.model.js";
import { Pengajar } from "../models/pengajar.model.js";

// **1. Tambahkan Kursus Baru**
export const addKursus = async (req, res) => {
  try {
    const { nama, totalPertemuan, jadwal, pengajarId } = req.body;

    // Validasi pengajar
    const pengajar = await Pengajar.findById(pengajarId);
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    const kursus = new Kursus({
      nama,
      totalPertemuan,
      jadwal,
      pengajar: pengajarId,
    });

    await kursus.save();

    // Tambahkan kursus ke data pengajar
    pengajar.kursus.push(kursus._id);
    await pengajar.save();

    res.status(201).json({ message: "Kursus berhasil ditambahkan", kursus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **2. Dapatkan Semua Kursus**
export const getAllKursus = async (req, res) => {
  try {
    const kursus = await Kursus.find().populate("pengajar", "nama");
    res.status(200).json(kursus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **3. Dapatkan Kursus Berdasarkan ID**
export const getKursusById = async (req, res) => {
  try {
    const { kursusId } = req.params;

    const kursus = await Kursus.findById(kursusId).populate("pengajar", "nama");
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });

    res.status(200).json(kursus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **4. Update Kursus**
export const updateKursus = async (req, res) => {
  try {
    const { kursusId } = req.params;
    const updates = req.body;

    const kursus = await Kursus.findByIdAndUpdate(kursusId, updates, { new: true });
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });

    res.status(200).json({ message: "Kursus berhasil diperbarui", kursus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **5. Hapus Kursus**
export const deleteKursus = async (req, res) => {
  try {
    const { kursusId } = req.params;

    const kursus = await Kursus.findByIdAndDelete(kursusId);
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });

    // Hapus kursus dari pengajar
    const pengajar = await Pengajar.findById(kursus.pengajar);
    if (pengajar) {
      pengajar.kursus = pengajar.kursus.filter((id) => id.toString() !== kursusId);
      await pengajar.save();
    }

    res.status(200).json({ message: "Kursus berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// **6. Tambahkan Pertemuan ke Kursus**
export const addPertemuan = async (req, res) => {
    try {
      const { kursusId } = req.params;
      const { nomor, jenis, materi, tugas } = req.body;
  
      const kursus = await Kursus.findById(kursusId);
      if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });
  
      kursus.pertemuan.push({ nomor, jenis, materi, tugas });
      await kursus.save();
  
      res.status(201).json({ message: "Pertemuan berhasil ditambahkan", kursus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // **7. Hapus Pertemuan**
  export const deletePertemuan = async (req, res) => {
    try {
      const { kursusId, pertemuanId } = req.params;
  
      const kursus = await Kursus.findById(kursusId);
      if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });
  
      kursus.pertemuan = kursus.pertemuan.filter(
        (pertemuan) => pertemuan._id.toString() !== pertemuanId
      );
      await kursus.save();
  
      res.status(200).json({ message: "Pertemuan berhasil dihapus", kursus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  // **8. Upload Tugas oleh Siswa**
export const uploadTugas = async (req, res) => {
    try {
      const { kursusId, pertemuanId, siswaId } = req.params;
      const { filePath } = req.body;
  
      const kursus = await Kursus.findById(kursusId);
      if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });
  
      const pertemuan = kursus.pertemuan.id(pertemuanId);
      if (!pertemuan) return res.status(404).json({ message: "Pertemuan tidak ditemukan" });
  
      pertemuan.nilaiTugas.push({
        siswaId,
        filePath,
      });
  
      await kursus.save();
      res.status(200).json({ message: "Tugas berhasil diupload", kursus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // **9. Nilai Tugas**
  export const gradeTugas = async (req, res) => {
    try {
      const { kursusId, pertemuanId, siswaId } = req.params;
      const { nilai, komentar } = req.body;
  
      const kursus = await Kursus.findById(kursusId);
      if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });
  
      const pertemuan = kursus.pertemuan.id(pertemuanId);
      if (!pertemuan) return res.status(404).json({ message: "Pertemuan tidak ditemukan" });
  
      const tugas = pertemuan.nilaiTugas.find(
        (tugas) => tugas.siswaId.toString() === siswaId
      );
  
      if (!tugas) return res.status(404).json({ message: "Tugas tidak ditemukan untuk siswa ini" });
  
      tugas.nilai = nilai;
      tugas.komentar = komentar;
      tugas.tanggalPenilaian = new Date();
  
      await kursus.save();
      res.status(200).json({ message: "Tugas berhasil dinilai", kursus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // **10. Dapatkan Semua Tugas Siswa**
  export const getAllTugasSiswa = async (req, res) => {
    try {
      const { kursusId, siswaId } = req.params;
  
      const kursus = await Kursus.findById(kursusId)
        .populate("pertemuan.nilaiTugas.siswaId", "nama")
        .exec();
  
      if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });
  
      const tugasSiswa = kursus.pertemuan.flatMap((pertemuan) =>
        pertemuan.nilaiTugas.filter((tugas) => tugas.siswaId._id.toString() === siswaId)
      );
  
      res.status(200).json(tugasSiswa);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
