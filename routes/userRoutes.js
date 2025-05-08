const express = require("express");
const router = express.Router();
const { register, login, getUserProfile, getAllUsersWithLastMessage } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", getUserProfile);
router.get("/", getAllUsersWithLastMessage);

module.exports = router;
