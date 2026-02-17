const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  isPreloaded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Photo", photoSchema);
