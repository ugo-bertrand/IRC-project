const user = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();

router.post("/addUser", user.createUser);
router.post("/login",user.login);
router.get("/", user.findAllUser);
router.get("/:id", user.findUserById);
router.get("/logout/user", user.logout);
router.put("/update/:id", user.updateUserById);
router.delete("/delete/:id", user.deleteUserById);

module.exports = router;
