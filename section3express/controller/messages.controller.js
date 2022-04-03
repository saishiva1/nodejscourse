const path = require("path");

const getMessages = (req, res) => {
    // res.send('<h1>hello</h1>');
    res.sendFile(path.join(__dirname, '..', 'public', 'images', 'example.png'));
}

function postMessage(req, res) {
    res.send('updating message');
}

module.exports = {
    getMessages,
    postMessage
}