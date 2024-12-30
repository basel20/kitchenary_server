const express = require("express");
const router = express.Router();
//const upload = require("../config/storageConfig");

const {
    getAllKitchens,
    getKitchenById,
    createKitchen
  } = require("../controllers/kitchenControllers");

  const upload = require("../config/storageConfig");


router.get("/", getAllKitchens);
router.get("/:id", getKitchenById);
router.post("/admin/create-kitchen_admin", createKitchen, upload.array("files", 5));



module.exports = router;