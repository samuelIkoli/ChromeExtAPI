const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
const Video = require("../models/Upload");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
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
      req.file.buffer,
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

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSingleVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findByIdAndDelete(videoId);
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const searchVideo = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ msg: "Name parameter is required for search." });
    }
    // Perform the search in the database
    const videos = await Video.find({
      filename: { $regex: name, $options: "i" },
    });

    if (videos.length === 0) {
      return res.status(404).json({ msg: "No videos found with that name." });
    }
    res.status(200).json({ videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo,
  searchVideo,
};
