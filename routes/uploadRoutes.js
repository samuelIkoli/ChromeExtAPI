const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadVideo, getAllVideos, getSingleVideo, deleteVideo, searchVideo } =
  uploadController;

// upload video: POST
router.post("/upload", upload.single("file"), uploadVideo);

router.get("/", (req, res) => {
  res.send("Ubongggggggggggg");
});

router.get("/videos/:videoId", getSingleVideo);

router.get("/videos", getAllVideos);

router.delete("/videos/:videoId", deleteVideo);

router.get("/search", searchVideo);

module.exports = router;
