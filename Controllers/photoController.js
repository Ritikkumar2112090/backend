const Photo = require("../Models/Photo");
const path = require("path");
const fs = require("fs");

// Upload photos
exports.uploadPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded"
      });
    }

    const uploadedPhotos = [];

    for (const file of req.files) {
      const photo = await Photo.create({
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
        isPreloaded: false
      });

      uploadedPhotos.push(photo);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      data: {
        photos: uploadedPhotos
      }
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all photos (for gallery)
exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: {
        photos: photos
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single photo by ID (to serve the actual file)
exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found"
      });
    }

    // Check if file exists
    if (!fs.existsSync(photo.path)) {
      return res.status(404).json({
        success: false,
        message: "Photo file not found on server"
      });
    }

    // Send the file
    res.sendFile(path.resolve(photo.path));

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete photo
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found"
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(photo.path)) {
      fs.unlinkSync(photo.path);
    }

    // Delete from database
    await Photo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Photo deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
