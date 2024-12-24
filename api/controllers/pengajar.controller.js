import { Pengajar } from "../models/pengajar.model.js";
import { Kursus } from "../models/kursus.model.js";

// **1. Tambah Pengajar Baru**
export const addPengajar = async (req, res) => {
  try {
    const { nama } = req.body;

    const pengajar = new Pengajar({
      nama,
    });

    await pengajar.save();
    res.status(201).json({ message: "Pengajar berhasil ditambahkan", pengajar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **2. Dapatkan Semua Pengajar**
export const getAllPengajar = async (req, res) => {
  try {
    const pengajar = await Pengajar.find().populate("kursus", "nama");
    res.status(200).json(pengajar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **3. Dapatkan Pengajar Berdasarkan ID**
export const getPengajarById = async (req, res) => {
  try {
    const { pengajarId } = req.params;

    const pengajar = await Pengajar.findById(pengajarId).populate("kursus", "nama");
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    res.status(200).json(pengajar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **4. Update Pengajar**
export const updatePengajar = async (req, res) => {
  try {
    const { pengajarId } = req.params;
    const updates = req.body;

    const pengajar = await Pengajar.findByIdAndUpdate(pengajarId, updates, { new: true });
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    res.status(200).json({ message: "Pengajar berhasil diperbarui", pengajar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **5. Hapus Pengajar**
export const deletePengajar = async (req, res) => {
  try {
    const { pengajarId } = req.params;

    const pengajar = await Pengajar.findByIdAndDelete(pengajarId);
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    res.status(200).json({ message: "Pengajar berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **6. Tambahkan Kursus ke Pengajar**
export const addKursusToPengajar = async (req, res) => {
  try {
    const { pengajarId, kursusId } = req.params;

    const pengajar = await Pengajar.findById(pengajarId);
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    const kursus = await Kursus.findById(kursusId);
    if (!kursus) return res.status(404).json({ message: "Kursus tidak ditemukan" });

    if (!pengajar.kursus.includes(kursusId)) {
      pengajar.kursus.push(kursusId);
      await pengajar.save();
    }

    res.status(200).json({ message: "Kursus berhasil ditambahkan ke pengajar", pengajar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **7. Hapus Kursus dari Pengajar**
export const removeKursusFromPengajar = async (req, res) => {
  try {
    const { pengajarId, kursusId } = req.params;

    const pengajar = await Pengajar.findById(pengajarId);
    if (!pengajar) return res.status(404).json({ message: "Pengajar tidak ditemukan" });

    pengajar.kursus = pengajar.kursus.filter((id) => id.toString() !== kursusId);
    await pengajar.save();

    res.status(200).json({ message: "Kursus berhasil dihapus dari pengajar", pengajar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
