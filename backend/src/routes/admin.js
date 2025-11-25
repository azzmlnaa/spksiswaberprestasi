import express from "express";
import {
    getAllWali,
    createWali,
    updateWali,
    deleteWali
} from "../controllers/adminController.js";

const router = express.Router();

// CRUD akun wali kelas
router.get("/walikelas", getAllWali);
router.post("/walikelas", createWali);
router.put("/walikelas/:id", updateWali);
router.delete("/walikelas/:id", deleteWali);

export default router;
