const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hash = async (pwd) => await bcrypt.hash(pwd, 10);
const compare = async (pwd, hashPwd) => await bcrypt.compare(pwd, hashPwd);

const sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
const verify = (token) => jwt.verify(token, process.env.JWT_SECRET || 'secret');

module.exports = { hash, compare, sign, verify };
