const Photo = require("../models/Photo");
const path = require("path");
const fs = require("fs");

// Upload photos
exports.uploadPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadedPhotos = [];

    for (const file of req.files) {
      const photo = await Photo.create({
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        path: `uploads/${file.filename}`,
        size: file.size,
        isPreloaded: false
      });
      uploadedPhotos.push(photo);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      data: { photos: uploadedPhotos }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all photos
exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: { photos } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Serve single photo file
exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ success: false, message: "Photo not found" });

    const filePath = path.join(__dirname, "..", photo.path);
    if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: "Photo file missing" });

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete photo
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ success: false, message: "Photo not found" });

    const filePath = path.join(__dirname, "..", photo.path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Photo.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
