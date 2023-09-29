const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const { uploadVideo, getAllVideos, getSingleVideo, deleteVideo, searchVideo } =
  uploadController;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// upload video: POST
router.post("/upload", upload.single("video"), uploadVideo);

router.get("/", (req, res) => {
  res.send("Ubongggggggggggg");
});

router.get("/videos/:videoId", getSingleVideo);

router.get("/videos", getAllVideos);

router.delete("/videos/:videoId", deleteVideo);

router.get("/search", searchVideo);

module.exports = router;
