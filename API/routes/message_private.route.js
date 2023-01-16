const express = require("express");
const router = express.Router();
const messagePrivate = require("../controllers/message_private.controller.js");

router.post("/addMessagePrivate", messagePrivate.createMessagePrivate);
router.get("/", messagePrivate.findAllMessagePrivate);
router.get("/:id", messagePrivate.findMessagePrivateById);
router.put("/update/:id",messagePrivate.updateMessagePrivateById);
router.delete("/delete/:id", messagePrivate.deleteMessagePrivateById);

module.exports = router;