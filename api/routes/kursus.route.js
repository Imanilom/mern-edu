import express from "express";
import {
  addKursus,
  getAllKursus,
  getKursusById,
  updateKursus,
  deleteKursus,
  addPertemuan,
  deletePertemuan,
  uploadTugas,
  gradeTugas,
  getAllTugasSiswa,
} from "../controllers/kursus.controller.js";

const router = express.Router();

// Kursus Routes
router.post("/", addKursus);
router.get("/", getAllKursus);
router.get("/:kursusId", getKursusById);
router.put("/:kursusId", updateKursus);
router.delete("/:kursusId", deleteKursus);

// Pertemuan Routes
router.post("/:kursusId/pertemuan", addPertemuan);
router.delete("/:kursusId/pertemuan/:pertemuanId", deletePertemuan);

// Tugas Routes
router.post("/:kursusId/pertemuan/:pertemuanId/siswa/:siswaId", uploadTugas);
router.put("/:kursusId/pertemuan/:pertemuanId/siswa/:siswaId", gradeTugas);
router.get("/:kursusId/siswa/:siswaId", getAllTugasSiswa);

export default router;
