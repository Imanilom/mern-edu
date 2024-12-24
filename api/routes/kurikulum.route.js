import express from "express";
import {
  getAllKurikulum,
  getKurikulumById,
  createKurikulum,
  updateKurikulum,
  deleteKurikulum,
  addKursusToKurikulum,
  removeKursusFromKurikulum,
} from "../controllers/kurikulum.controller.js";

const router = express.Router();

// Mendapatkan semua kurikulum
router.get("/", getAllKurikulum);

// Mendapatkan kurikulum berdasarkan ID
router.get("/:id", getKurikulumById);

// Menambahkan data kurikulum baru
router.post("/", createKurikulum);

// Memperbarui kurikulum berdasarkan ID
router.put("/:id", updateKurikulum);

// Menghapus kurikulum berdasarkan ID
router.delete("/:id", deleteKurikulum);

// Menambahkan kursus ke kurikulum
router.post("/:id/kursus", addKursusToKurikulum);

// Menghapus kursus dari kurikulum
router.delete("/:id/kursus/:kursusId", removeKursusFromKurikulum);

export default router;
