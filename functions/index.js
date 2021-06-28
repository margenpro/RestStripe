const functions = require("firebase-functions");
const express = require("express");
const Stripe = require("stripe");
const { creds } = require("./creds.json");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { apiKey } = require("./apikey.json");

const stripe = Stripe(apiKey);

const app = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(express.static("."));
app.use(express.json());

app.post("/api/email", async (req, res) => {
  let user = req.body.user;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: creds.email,
      pass: creds.pass
    }
  });

  try {
    await transporter.sendMail({
      from: creds.email, // sender address
      to: user.email, // list of receivers
      subject: "Successful Registration", // Subject line
      text: `Hi ${user.username}! Thank you so much for joining us! This are your credentials:\nUsername: ${user.username}\nEmail: ${user.email}`
    });
    console.log("Email Sent!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/pay", async (req, res) => {
  try {
    const card = req.body.token.Card;
    const exp = card.expiry.split("/");

    const tokenCard = {
      number: card.number,
      exp_month: exp[0],
      exp_year: exp[1],
      cvc: card.cvc
    };

    const token = await stripe.tokens.create({
      card: tokenCard
    });

    const result = await stripe.charges.create({
      amount: 60, //Unit: cents
      currency: "cad",
      source: token.id,
      description: "Test payment"
    });
    res.status(200).send({ status: result.status });
  } catch (err) {
    res.status(402).send({ code: err.message });
  }
});

app.get("/api/test", (req, res) => {
  res.send("Test get! :D");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

exports.app = functions.https.onRequest(app);
