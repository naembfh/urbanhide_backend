"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const userAuth_routes_1 = require("./app/modules/userAuth/userAuth.routes");
const category_routes_1 = require("./app/modules/category/category.routes");
const product_routes_1 = require("./app/modules/product/product.routes");
const review_routes_1 = require("./app/modules/review/review.routes");
const order_route_1 = require("./app/modules/order/order.route");
// app
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// https://urbanhide.vercel.app/
// http://localhost:3000/
//parsers
app.use(express_1.default.json());
// application routes
app.use("/api/auth/", userAuth_routes_1.UserAuthRoutes);
app.use("/api/category/", category_routes_1.categoryRoutes);
app.use("/api/product/", product_routes_1.ProductRoutes);
app.use("/api/reviews/", review_routes_1.ReviewRoutes);
app.use("/api/order/", order_route_1.orderRoutes);
//Not Found
app.use(notFound_1.default);
// global error handler
app.use(globalErrorhandler_1.default);
// test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
