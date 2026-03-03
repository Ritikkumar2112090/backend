const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const photoController = require("../controllers/photoController");

// Multer config for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("photos", 10), photoController.uploadPhotos);
router.get("/gallery", photoController.getPhotos);
router.get("/:id", photoController.getPhotoById);
router.delete("/:id", photoController.deletePhoto);

module.exports = router;
