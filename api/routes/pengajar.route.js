import express from "express";
import {
  addPengajar,
  getAllPengajar,
  getPengajarById,
  updatePengajar,
  deletePengajar,
  addKursusToPengajar,
  removeKursusFromPengajar,
} from "../controllers/pengajar.controller.js";

const router = express.Router();

// Pengajar Routes
router.post("/", addPengajar); // Tambah pengajar baru
router.get("/", getAllPengajar); // Dapatkan semua pengajar
router.get("/:pengajarId", getPengajarById); // Dapatkan pengajar berdasarkan ID
router.put("/:pengajarId", updatePengajar); // Update pengajar
router.delete("/:pengajarId", deletePengajar); // Hapus pengajar

// Kursus Management for Pengajar
router.post("/:pengajarId/kursus/:kursusId", addKursusToPengajar); // Tambahkan kursus ke pengajar
router.delete("/:pengajarId/kursus/:kursusId", removeKursusFromPengajar); // Hapus kursus dari pengajar

export default router;
