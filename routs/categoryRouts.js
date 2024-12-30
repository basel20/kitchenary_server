const express = require("express");
const router = express.Router();
//const upload = require("../config/storageConfig");

const {
    getAllCategories, getCategoryById
  } = require("../controllers/categoryControllers");


router.get("/", getAllCategories);


module.exports = router;