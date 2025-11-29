const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const user = rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        class_id: user.class_id || null,  // penting untuk wali kelas
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      status: "success",
      token,
      role: user.role,
      username: user.username,
      class_id: user.class_id
    });
   


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
