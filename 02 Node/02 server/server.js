const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3003;

const server = http.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    req.url == "/" ? "index.html" : req.url
  );
  const extName = String(path.extname(filepath).toLocaleLowerCase());

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };

  const contentType = mimeTypes[extName] || "application/uctet-stream";
  fs.readFile(filepath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("<h1>404 Not Found</h1>");
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

  server.listen(PORT, () => console.log(`server is connected on ${PORT}`));

