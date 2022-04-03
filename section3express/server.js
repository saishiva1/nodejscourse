const express = require("express");
const path = require("path");
const hbs = require('hbs')
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const PORT = 3000;

app.use((req, res, next) => {
    const starttime = Date.now();
    console.log(`${req.method} ${req.url}`);
    next();
    const endtime = Date.now();
    console.log(endtime - starttime + "ms");
});
app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", (req, res) => {
    res.render('index', {
        title: 'hello',
        caption: 'well well well'
    })
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.use("*", (req, res) => {
    res.send("<h1>404</h1>")
})

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});