import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import authRouter from "./routes/authenticate.route";
import userRouter from "./routes/user.route";
import env from "./utils/envalid";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello!");
});

app.use(
  session({
    name: "chat-app-cookie",
    secret: env.SESSION_SECRET,
    rolling: true,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: env.MONGO,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/api", authRouter);
app.use("/api", userRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "endpoint not found!"));
});

app.use((req, res, next) => {
  next(createHttpError("404", "Endpoint not found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown has occured";
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
});

export default app;
