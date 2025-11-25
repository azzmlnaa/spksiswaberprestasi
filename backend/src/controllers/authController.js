const db = require('../config/db');
const { sign } = require('../utils');

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'username & password required' });

  const [rows] = await db.query(
    'SELECT id, username, password, full_name, role, class_id FROM users WHERE username = ?',
    [username]
  );

  if (!rows.length)
    return res.status(401).json({ message: 'Invalid' });

  const user = rows[0];

  // langsung cocokkan tanpa hash
  if (password !== user.password)
    return res.status(401).json({ message: 'Invalid' });

  const token = sign({
    id: user.id,
    username: user.username,
    role: user.role,
    class_id: user.class_id
  });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role,
      class_id: user.class_id
    }
  });
}

module.exports = { login };
