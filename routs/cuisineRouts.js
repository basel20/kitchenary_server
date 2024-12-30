const express = require("express");
const router = express.Router();
//const upload = require("../config/storageConfig");

const {
    createCuisine
  } = require("../controllers/cuisineController");

  const upload = require("../config/storageConfig");



router.post("/admin/create-cuisine", createCuisine, upload.array("files", 5));



module.exports = router;