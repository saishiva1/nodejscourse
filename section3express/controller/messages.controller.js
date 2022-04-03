const getMessages = (req, res) => {
    res.send('<h1>hello</h1>');
}

function postMessage(req, res) {
    res.send('updating message');
}

module.exports = {
    getMessages,
    postMessage
}