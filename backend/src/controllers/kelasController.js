const db = require('../config/db');

// =======================
// GET ALL KELAS
// =======================
exports.getAllKelas = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, class_name FROM classes ORDER BY id ASC"
    );
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

// =======================
// CREATE KELAS
// =======================
exports.createKelas = async (req, res) => {
  try {
    const { class_name } = req.body;

    if (!class_name) {
      return res.status(400).json({ message: "class_name required" });
    }

    await db.query(
      "INSERT INTO classes (class_name) VALUES (?)",
      [class_name]
    );

    res.json({ message: "Kelas berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error });
  }
};

// =======================
// UPDATE KELAS
// =======================
exports.updateKelas = async (req, res) => {
  try {
    const id = req.params.id;
    const { class_name } = req.body;

    if (!class_name) {
      return res.status(400).json({ message: "class_name required" });
    }

    await db.query(
      "UPDATE classes SET class_name = ? WHERE id = ?",
      [class_name, id]
    );

    res.json({ message: "Kelas berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

// =======================
// DELETE KELAS
// =======================
exports.deleteKelas = async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM classes WHERE id = ?", [id]);

    res.json({ message: "Kelas berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};
