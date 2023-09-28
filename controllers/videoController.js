// const Upload = require("../models/Upload");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Upload.findAll();
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Upload.findByPk(id);
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    res.status(200).json({ video });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { getAllVideos, getSingleVideo };
