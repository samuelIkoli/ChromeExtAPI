const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
const Video = require("../models/Upload");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINAY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadVideo = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      //upload to cloudinary
      req.file.path,
      {
        folder: "uploads",
      }
    );

    const videoUrl = cloudinaryResponse.secure_url;

    // Save the image URL to the database
    const file = new Video({
      filename: req.file.originalname,
      videoUrl: videoUrl,
    });

    await file.save();

    res.status(201).json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { uploadVideo };
