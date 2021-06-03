const functions = require("firebase-functions");
const express = require('express')
const Stripe = require("stripe")
const {creds} = require("../creds.json") 
const nodemailer = require("nodemailer")
const cors = require("cors");

const stripe = Stripe("sk_test_51Iov1mH463ReSVuZqMseoXxSB8eEtNhIFiMRub8epDcCDD63Ndok1QmBSo1mefIyLPALc7ysxaj4jCqTMNYjRe1i00VSlbri1n")

const app = express()
const port = 3000

app.use(cors({origin: true}))
app.use(express.static("."));
app.use(express.json());

app.post('/api/email', async (req, res) => {

  let user = req.body.user
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAaa");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: creds.email, 
      pass: creds.pass
    },
  });

  try {
    await transporter.sendMail({
      from: creds.email, // sender address
      to: user.email, // list of receivers
      subject: "Successful Registration", // Subject line
      text: `Hi ${user.username}! Thank you so much for joining us! This are your credentials:\nUsername: ${user.username}\nEmail: ${user.email}`
    })
    console.log("Email Sent!");
  
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/pay', async (req, res) => {

    return stripe.charges
      .create({
        amount: 60, // Unit: cents
        currency: "cad",
        source: req.body.token.tokenId,
        description: 'Test payment',
        
      })
      .then(result => {
        console.log("Done!");
        console.log(result);
        res.status(200).send({status:result.status})
      })
      .catch(err => res.status(402).send({code: err.decline_code}));
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.app = functions.https.onRequest(app);