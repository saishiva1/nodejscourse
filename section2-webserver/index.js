const http = require("http");
const PORT = 3000;

const friends = [{
        id: 1,
        name: "friend one",
    },
    {
        id: 2,
        name: "friend two",
    },
];

const server = http.createServer((req, res) => {
    const resourse = req.url.split("/");
    if (resourse[1] === "friends") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        const returnValue = resourse[2] ? friends[resourse[2]] : friends;
        res.end(JSON.stringify({ data: returnValue }));
    } else if (resourse[1] === "messages") {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write("<h1>hello</h1>");
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => console.log("running on " + PORT));