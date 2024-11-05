"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to database:", config_1.default.database_url);
            yield mongoose_1.default.connect("mongodb+srv://naembfh:rDnl3Hdkq5hAz0bx@cluster0.nk62lkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`App is listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error("Database connection failed:", err);
            process.exit(1);
        }
    });
}
main();
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
    console.log(`😈 Unhandled Rejection detected:`, reason);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.log(`😈 Uncaught Exception detected:`, error);
    process.exit(1);
});
