const express = require("express");
const messagesController = require("./controller/messages.controller.js");
const friendController = require("./controller/friends.controller");

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    const starttime = Date.now();
    console.log(`${req.method} ${req.url}`);
    next();
    const endtime = Date.now();
    console.log(endtime - starttime + "ms");
});
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ id: 1, message: "hello" });
});

app.get("/friends", friendController.getFriends);

app.post("/friends", friendController.postFriend);

app.get("/friends/:friendId", friendController.getFriend);

app.get("/messages", messagesController.getMessages);

app.post("/messages", messagesController.postMessage);

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});