import express from "express";
import {
    addSiswa, 
    deleteSiswa, 
    enrollKursus, 
    getAllSiswa, 
    getSiswaById, 
    removeKursus, 
    updateProgress, 
    updateSiswa} from '../controllers/siswa.controller';
    
const router = express.Router();

router.post("/", addSiswa); // Tambah siswa baru
router.get("/", getAllSiswa); // Dapatkan semua siswa
router.get("/:siswaId", getSiswaById); // Dapatkan siswa berdasarkan ID
router.put("/:siswaId", updateSiswa); // Update data siswa
router.delete("/:siswaId", deleteSiswa); // Hapus siswa
router.post("/:siswaId/kursus/:kursusId", enrollKursus); // Tambahkan kursus ke siswa
router.delete("/:siswaId/kursus/:kursusId", removeKursus); // Hapus kursus dari siswa
router.put("/:siswaId/kursus/:kursusId/progress", updateProgress); // Update progress kursus

export default router;