const express = require("express");
const router = express.Router();
//const upload = require("../config/storageConfig");

const {
    registerUser,
    login,
    logout,
    verifyEmail,
    updateUserInfo,
    // // getAllUsers,
    // updatePassword,
    // verifyEmailToken,
    // resetPassword,
  } = require("../controllers/userControllers");

const upload = require("../config/storageConfig");  
const { userAuth } = require("../middleware/userAuth");

router.post("/login", login);
router.post("/register", registerUser);
router.post("/logout", userAuth, logout);
router.get('/verify/:token', verifyEmail);
router.patch('/update', userAuth,upload.single("image"), updateUserInfo);

module.exports = router;
