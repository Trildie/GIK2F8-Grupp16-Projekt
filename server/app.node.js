
const http = require("http");

const server = http.createServer((req, res) => {
  const statusCode = 425;
  res.writeHead(statusCode);
  res.end(`Du gjorde ett ${req.method}-anrop till ${req.url}`);
});

server.listen("5000", () =>
  console.log("test av server på http/localDerp:5000")
);
