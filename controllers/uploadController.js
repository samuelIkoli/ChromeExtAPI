const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
const Video = require("../models/Upload");

cloudinary.config({
  cloud_name: "ubongedem78",
  api_key: "233473746799948",
  api_secret: "BM4aBSxRmQOU_vhaO72QskFirKE",
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
