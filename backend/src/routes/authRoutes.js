const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// route login
router.post("/login", login);

module.exports = router;
