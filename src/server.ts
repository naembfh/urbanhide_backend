import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    console.log("Connecting to database:", config.database_url);
    await mongoose.connect(
      "mongodb+srv://naembfh:rDnl3Hdkq5hAz0bx@cluster0.nk62lkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.log(`😈 Unhandled Rejection detected:`, reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`😈 Uncaught Exception detected:`, error);
  process.exit(1);
});
