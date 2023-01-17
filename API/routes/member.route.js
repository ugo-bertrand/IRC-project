const express = require("express");
const router = express.Router();
const member = require("../controllers/member.controller.js");

router.post("/addMember", member.createMember);
router.get("/", member.findAllMember);
router.get("/:id", member.findMemberById);
router.get("/:channelId/member", member.findMembersOfChannel);
router.get("/:userId/channel", member.findChannelOfMember);
router.put("/update/:id", member.updateMemberById);
router.delete("/delete/:id", member.deleteMemberById);

module.exports = router;