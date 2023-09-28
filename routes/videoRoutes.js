const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

const { getAllVideos, getSingleVideo } = videoController;

// GET video by id
router.get("/:videoId", getSingleVideo);
router.get("/", getAllVideos);

module.exports = router;
