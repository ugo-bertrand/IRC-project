const express = require("express");
const router = express.Router();
const channel = require("../controllers/channel.controller.js");

router.post("/addChannel", channel.createChannel);
router.get("/", channel.findAllChannel);
router.get("/:id", channel.findChannelById);
router.put("/update/:id", channel.updateChannelById);
router.delete("/delete/:id", channel.deleteChannelById);

module.exports = router;