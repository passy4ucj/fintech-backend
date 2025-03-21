import app from "./app";
import Logger from "./logger";
import { createServer } from "http";
import http from "http";
import https from "https";
import path from "path";
import fs from "fs";
import { prisma } from "./client";
const PORT = process.env.PORT || 3000;

// start the express app
const start = async () => {
  try {
    Logger.info("connected to the database");

    const PORT = process.env.PORT || 5000;

let httpServer: any;
let newPORT: any;

if (process.env.NODE_ENV === "production") {

  const options = {
    cert: fs.readFileSync(
      path.resolve(__dirname, "outcess-ssl", "pascal_send_funds.pem"),
      "utf8"
    ),
    key: fs.readFileSync(
      path.resolve(__dirname, "outcess-ssl", "pascal_send_funds.key"),
      "utf8"
    ),
    passphrase: process.env.PASS_PHRASE,
  };

  httpServer = https.createServer(options, app);
    newPORT = 443;
  } else {
    httpServer = http.createServer(app);
    newPORT = PORT;
  }

    // const httpServer = createServer(app);

    httpServer.listen(newPORT, () => {
      Logger.info(`Server started on port ${PORT} 🔥🔥🔥`);
    });
  } catch (err) {
    Logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
