import http from "http";
import app from "./src/app.js";

function main() {
  const server = http.createServer(app);

  const PORT = 8080;

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
