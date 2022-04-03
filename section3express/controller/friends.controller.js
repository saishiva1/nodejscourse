const friends = require("../model/friends.model");

function getFriends(req, res) {
    res.json(friends);
}

function postFriend(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Invalid name' });
    }
    const newFriend = {
        name,
        id: friends.length,
    };
    friends.push(newFriend);
    res.json(newFriend);
}

function getFriend(req, res) {
    const friendId = req.params.friendId;
    const friend = friends[friendId];
    if (friend) {
        res.json(friend);
    } else {
        res.status(404).json({
            error: "does not exists",
        });
    }
}

module.exports = {
    getFriends,
    postFriend,
    getFriend
}