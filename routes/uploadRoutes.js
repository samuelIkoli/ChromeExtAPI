const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadVideo } = uploadController;

// upload video: POST
router.post("/", upload.single("file"), uploadVideo);

router.get("/", upload.single("file"), (req, res) => {
  res.send("Ubongggggggggggg");
});
module.exports = router;
