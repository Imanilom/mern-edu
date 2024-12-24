import { Kurikulum } from "../models/kurikulum.model.js";

/**
 * Mendapatkan semua data kurikulum
 */
export const getAllKurikulum = async (req, res) => {
  try {
    const kurikulum = await Kurikulum.find();
    res.status(200).json(kurikulum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mendapatkan kurikulum berdasarkan ID
 */
export const getKurikulumById = async (req, res) => {
  try {
    const kurikulum = await Kurikulum.findById(req.params.id);
    if (!kurikulum) return res.status(404).json({ message: "Kurikulum tidak ditemukan" });
    res.status(200).json(kurikulum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Menambahkan data kurikulum baru
 */
export const createKurikulum = async (req, res) => {
  try {
    const { kelas, kursus } = req.body;
    const kurikulum = new Kurikulum({ kelas, kursus });
    await kurikulum.save();
    res.status(201).json(kurikulum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Memperbarui kurikulum berdasarkan ID
 */
export const updateKurikulum = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedKurikulum = await Kurikulum.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedKurikulum) return res.status(404).json({ message: "Kurikulum tidak ditemukan" });
    res.status(200).json(updatedKurikulum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Menghapus kurikulum berdasarkan ID
 */
export const deleteKurikulum = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedKurikulum = await Kurikulum.findByIdAndDelete(id);
    if (!deletedKurikulum) return res.status(404).json({ message: "Kurikulum tidak ditemukan" });
    res.status(200).json({ message: "Kurikulum berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Menambahkan kursus ke kurikulum berdasarkan ID
 */
export const addKursusToKurikulum = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaKursus, jadwal } = req.body;

    const kurikulum = await Kurikulum.findById(id);
    if (!kurikulum) return res.status(404).json({ message: "Kurikulum tidak ditemukan" });

    kurikulum.kursus.push({ namaKursus, jadwal });
    await kurikulum.save();

    res.status(200).json(kurikulum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Menghapus kursus dari kurikulum berdasarkan ID
 */
export const removeKursusFromKurikulum = async (req, res) => {
  try {
    const { id, kursusId } = req.params;

    const kurikulum = await Kurikulum.findById(id);
    if (!kurikulum) return res.status(404).json({ message: "Kurikulum tidak ditemukan" });

    kurikulum.kursus = kurikulum.kursus.filter((kursus) => kursus._id.toString() !== kursusId);
    await kurikulum.save();

    res.status(200).json(kurikulum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
