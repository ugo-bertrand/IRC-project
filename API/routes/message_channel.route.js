const express = require("express");
const router = express.Router();
const messageChannel = require("../controllers/message_channel.controller.js");

router.post("/addMessageChannel", messageChannel.createMessageChannel);
router.get("/", messageChannel.findAllMessageChannel);
router.get("/:id", messageChannel.findMessageChannelById);
router.put("/update/:id", messageChannel.updateMessageChannelById);
router.delete("/delete/:id", messageChannel.deleteMessageChannelById);

module.exports = router;