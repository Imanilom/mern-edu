// Import model
import { Siswa } from "../models/siswa.model.js";
import { Kursus } from "../models/kursus.model.js";
import { Kelas } from "../models/kelas.model.js";

// **1. Tambah Siswa Baru**
export const addSiswa = async (req, res) => {
  try {
    const { nama, kelas } = req.body;

    const kelasData = await Kelas.findById(kelas);
    if (!kelasData) return res.status(404).json({ message: "Kelas tidak ditemukan" });

    const siswa = new Siswa({ nama, kelas });
    await siswa.save();

    res.status(201).json({ message: "Siswa berhasil ditambahkan", siswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **2. Dapatkan Semua Siswa**
export const getAllSiswa = async (req, res) => {
  try {
    const siswa = await Siswa.find().populate("kelas", "nama");
    res.status(200).json(siswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **3. Dapatkan Siswa Berdasarkan ID**
export const getSiswaById = async (req, res) => {
  try {
    const { siswaId } = req.params;

    const siswa = await Siswa.findById(siswaId).populate("kelas", "nama").populate("kursusDiambil.kursusId", "nama");
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    res.status(200).json(siswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **4. Update Data Siswa**
export const updateSiswa = async (req, res) => {
  try {
    const { siswaId } = req.params;
    const updates = req.body;

    const siswa = await Siswa.findByIdAndUpdate(siswaId, updates, { new: true });
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    res.status(200).json({ message: "Data siswa berhasil diperbarui", siswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **5. Hapus Siswa**
export const deleteSiswa = async (req, res) => {
  try {
    const { siswaId } = req.params;

    const siswa = await Siswa.findByIdAndDelete(siswaId);
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    res.status(200).json({ message: "Siswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **6. Tambahkan Kursus ke Siswa**
export const enrollKursus = async (req, res) => {
  try {
    const { siswaId, kursusId } = req.params;

    const siswa = await Siswa.findById(siswaId);
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    const kursus = await Kursus.findById(kursusId);
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });

    const isAlreadyEnrolled = siswa.kursusDiambil.some(k => k.kursusId.toString() === kursusId);
    if (isAlreadyEnrolled) return res.status(400).json({ message: "Siswa sudah terdaftar di kursus ini" });

    siswa.kursusDiambil.push({ kursusId });
    await siswa.save();

    res.status(200).json({ message: "Kursus berhasil ditambahkan ke siswa", siswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **7. Hapus Kursus dari Siswa**
export const removeKursus = async (req, res) => {
  try {
    const { siswaId, kursusId } = req.params;

    const siswa = await Siswa.findById(siswaId);
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    siswa.kursusDiambil = siswa.kursusDiambil.filter(k => k.kursusId.toString() !== kursusId);
    await siswa.save();

    res.status(200).json({ message: "Kursus berhasil dihapus dari siswa", siswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **8. Update Progress Kursus**
export const updateProgress = async (req, res) => {
  try {
    const { siswaId, kursusId } = req.params;
    const { pertemuanSelesai, tugasSelesai } = req.body;

    const siswa = await Siswa.findById(siswaId);
    if (!siswa) return res.status(404).json({ message: "Siswa tidak ditemukan" });

    const kursus = siswa.kursusDiambil.find(k => k.kursusId.toString() === kursusId);
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan untuk siswa ini" });

    kursus.progres.pertemuanSelesai = pertemuanSelesai || kursus.progres.pertemuanSelesai;
    kursus.progres.tugasSelesai = tugasSelesai || kursus.progres.tugasSelesai;

    await siswa.save();
    res.status(200).json({ message: "Progress berhasil diperbarui", siswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
