import app from "./app.js";

const port = Number(process.env.PORT || 3001);
const server = app.listen(port);

server.on("listening", () => {
  console.log(`API pornit pe http://localhost:${server.address().port}`);
});

server.on("error", (error) => {
  console.error(`API-ul nu a pornit: ${error.message}`);
  process.exitCode = 1;
});
