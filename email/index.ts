import express, { json, Request, Response, NextFunction } from "express";
import "dotenv/config";
import path from "node:path";
import ejs from "ejs";
import { logErrors } from "./src/middlewares/logErrors";
import { validateData } from "./src/middlewares/validateData";
import { transporter } from "./src/utils/transporter";

const { APP_PORT, EMAIL_FROM } = process.env;

const app = express();
app.use(json());

/* ************************************************************************* */

app.post(
  "/send-email",
  validateData,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { to, subject, firstname, content, loginUrl } = req.body;

      // Logo Stock Manage
      const logoUrl = path.join(
        __dirname,
        "./src/templates/StockManage_logo_xl.png",
      );

      const attachments = [
        { filename: "StockManage_logo_xl.png", path: logoUrl, cid: "logo" },
      ];

      // Rendu du template ejs avec les variables
      const html = await ejs.renderFile(
        path.join(__dirname, "src/templates/passwordMail.ejs"),
        { logoUrl, firstname, content, loginUrl },
      );

      await transporter.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        html,
        attachments,
      });
      res.status(200).json({ message: "E-mail envoyé" });
    } catch (err) {
      console.error("Erreur dans l'envoi de l'e-mail", err);
      next(err);
    }
  },
);

/* ************************************************************************* */

// Middleware to log errors. Must be at the end of the stack.
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
