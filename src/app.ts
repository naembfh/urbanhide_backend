import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

import { UserAuthRoutes } from "./app/modules/userAuth/userAuth.routes";
import { categoryRoutes } from "./app/modules/category/category.routes";
import { ProductRoutes } from "./app/modules/product/product.routes";
import { ReviewRoutes } from "./app/modules/review/review.routes";
import { orderRoutes } from "./app/modules/order/order.route";


// app
const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// https://urbanhide.vercel.app/
// http://localhost:3000/


//parsers
app.use(express.json());

// application routes
app.use("/api/auth/", UserAuthRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/product/", ProductRoutes);
app.use("/api/reviews/", ReviewRoutes);
app.use("/api/order/", orderRoutes);


//Not Found
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
