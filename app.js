import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import dotenv from "dotenv";

const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config();

const createRedirectUrl = (state) => {
  const redirectUrl =
    "https://access.line.me/oauth2/v2.1/authorize?" +
    "response_type=code" +
    `&client_id=${process.env.CHANNEL_ID}` +
    `&redirect_uri=${process.env.CALLBACK_URL}` +
    `&state=${state}` +
    "&scope=profile%20openid";
  return redirectUrl;
};

function getToken() {
  const bytes = crypto.randomBytes(32);
  const token = bytes.toString("base64url");
  return token;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/login", (req, res) => {
  const state = getToken();
  const redirect = createRedirectUrl(state);
  res.redirect(redirect);
});

app.get("/success", (req, res) => {
  res.status(200).send("success");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
