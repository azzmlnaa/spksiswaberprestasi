const db = require("../config/db");

// ==============================
// LIST SEMUA WALI KELAS
// ==============================
exports.listWali = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, username, full_name, class_id FROM users WHERE role = 'wali_kelas'"
    );

    res.json({ status: "success", data: results });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ==============================
// CREATE WALI KELAS (tanpa hash)
// ==============================
exports.createWali = async (req, res) => {
  const { username, password, full_name, class_id } = req.body;

  if (!username || !password || !full_name || !class_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const [r] = await db.query(
      `INSERT INTO users (username, password, full_name, role, class_id)
       VALUES (?, ?, ?, 'wali_kelas', ?)`,
      [username, password, full_name, class_id]
    );

    return res.json({
      success: true,
      message: "Wali kelas berhasil dibuat",
      data: {
        id: r.insertId,
        username,
        full_name,
        class_id,
        role: "wali_kelas",
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ==============================
// UPDATE WALI KELAS
// ==============================
exports.updateWali = async (req, res) => {
  const { id } = req.params;
  const { username, password, full_name, class_id } = req.body;

  let fields = [];
  let params = [];

  if (username) { fields.push("username = ?"); params.push(username); }
  if (full_name) { fields.push("full_name = ?"); params.push(full_name); }
  if (class_id) { fields.push("class_id = ?"); params.push(class_id); }
  if (password) { fields.push("password = ?"); params.push(password); }

  if (fields.length === 0)
    return res.status(400).json({ status: "error", message: "No fields to update" });

  params.push(id);

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ? AND role = 'wali_kelas'`;

  try {
    await db.query(sql, params);
    res.json({ status: "success", message: "Wali kelas berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ==============================
// DELETE WALI KELAS
// ==============================
exports.deleteWali = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM users WHERE id = ? AND role = 'wali_kelas'", [id]);
    res.json({ status: "success", message: "Wali kelas berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
