const http = require("http");
const { PORT = 8080 } = process.env;

const fs = require("fs");
const path = require("path");
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function getHTML(htmlFileName) {
    const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
    return fs.readFileSync(htmlFilePath, "utf-8");
}
function onRequest(req, res) {
    switch (req.url) {
        case "/":
            res.writeHead(200);
            res.end(getHTML("index.html"));
            return;
        case "/cars":
            res.writeHead(200);
            res.end(getHTML("cariMobil.html"));
            return;
        default:
            res.writeHead(404);
            return;
    }
}

const server = http.createServer(onRequest);
server.listen(PORT, () => {
    console.log("server sedang berjalan", PORT);
});
