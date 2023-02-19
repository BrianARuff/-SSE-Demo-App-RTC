const { v4 } = require("uuid");
const PouchDB = require("pouchdb");

let rev = v4();

let response;

const updateResponse = async () => {
  // update a document
  await updateDocument();

  // get a document
  response = await getDocument();

  console.log("response", response?.value);
};

const http = require("http");
var os = require("os");

const host = "127.0.0.1";
const port = 8080;

const db = new PouchDB(`score_woosh_v${rev}_db`);

const updateDocument = async () => {
  rev += 1;
  try {
    if (rev !== 1) {
      const response = await db.put({
        _id: `score_woosh_v${rev}_db`,
        value: Math.floor(Math.random() * 1000000),
      });
    }
    console.log("updated document successfully");
  } catch (error) {
    console.log("updated document failed", error);
  }
};

const getDocument = async (res) => {
  try {
    const response = await db.get(`score_woosh_v${rev}_db`);
    return response;
  } catch (error) {
    console.log("getDocument", error);
  }
};

const requestListener = function (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const data = JSON.stringify(response?.value);
      res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, 4);
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  setInterval(() => updateResponse(), 1000);
  console.log(`server running at http://${host}:${port}`);
});
