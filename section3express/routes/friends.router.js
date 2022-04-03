const express = require("express");
const friendController = require("../controller/friends.controller");

const friendsRouter = express.Router();

friendsRouter.get("/", friendController.getFriends);

friendsRouter.post("/", friendController.postFriend);

friendsRouter.get("/:friendId", friendController.getFriend);

module.exports = friendsRouter;