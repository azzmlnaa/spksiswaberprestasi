const db = require('../config/db');

// CREATE kriteria
async function createCriteria(req, res) {
  const { name, weight, type } = req.body;

  if (!name || weight == null || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const normalizedType = type.toLowerCase() === "cost" ? "cost" : "benefit";

  const [r] = await db.query(
    `INSERT INTO criteria (name, weight, type) VALUES (?, ?, ?)`,
    [name, weight, normalizedType]
  );

  res.json({ success: true, id: r.insertId });
}

// READ / LIST semua kriteria
async function listCriteria(req, res) {
  const [rows] = await db.query(`SELECT * FROM criteria ORDER BY id ASC`);
  res.json(rows);
}

// UPDATE kriteria
async function updateCriteria(req, res) {
  const { id } = req.params;
  const { name, weight, type } = req.body;

  if (!name || weight == null || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const normalizedType = type.toLowerCase() === "cost" ? "cost" : "benefit";

  const [r] = await db.query(
    `UPDATE criteria SET name = ?, weight = ?, type = ? WHERE id = ?`,
    [name, weight, normalizedType, id]
  );

  res.json({ success: true, changed: r.changedRows });
}

// DELETE kriteria
async function deleteCriteria(req, res) {
  const { id } = req.params;

  const [r] = await db.query(
    `DELETE FROM criteria WHERE id = ?`,
    [id]
  );

  res.json({ success: true, deleted: r.affectedRows });
}

module.exports = {
  createCriteria,
  listCriteria,
  updateCriteria,
  deleteCriteria,
};
