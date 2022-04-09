const express = require("express");

const app = express();

function delay(duration) {
    const s = Date.now();
    while (Date.now() - s < duration) {}
}

app.get("/", (req, res) => {
    res.send(`perf ${process.pid}`);
});

app.get("/timer", (req, res) => {
    delay(5000);
    // setTimeout(() => {
    //     res.send('ding');
    // }, 5000);
    res.send(`ding ${process.pid}`);
});
app.listen(5000);