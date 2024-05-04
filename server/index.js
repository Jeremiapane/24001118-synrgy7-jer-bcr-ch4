const http = require("http");
const { PORT = 8686 } = process.env;

const fs = require("fs");
const path = require("path");
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function getHTML(htmlFileName) {
    const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
    return fs.readFileSync(htmlFilePath, "utf-8");
}

function serveStaticFile(req, res) {
    const filePath = path.join(PUBLIC_DIRECTORY, req.url);
    const contentType = getContentType(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Pages not found");
            return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".jpg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".svg":
            return "image/svg+xml";
        default:
            return "application/octet-stream";
    }
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
            serveStaticFile(req, res);
            break;
    }
}

const server = http.createServer(onRequest);
server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
