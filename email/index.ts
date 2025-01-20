import express, {
  json,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import "dotenv/config";

const { APP_PORT } = process.env;

const app = express();
app.use(json());

/* ************************************************************************* */

// Every route here...

/* ************************************************************************* */

// Middleware to log errors. Must be at the end of the stack.
const logErrors: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  console.error("on req:", req.method, req.url);

  // Pass the error to the next middleware
  next(err);
};

// Mount it at the end of the stack
app.use(logErrors);

/* ************************************************************************* */

// Finally, start the server
app
  .listen(APP_PORT, () => {
    console.info(`Listening on port ${APP_PORT}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
