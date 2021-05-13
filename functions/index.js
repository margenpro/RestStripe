const functions = require("firebase-functions");
const express = require('express')
const Stripe = require("stripe")
const cors = require("cors");

const stripe = Stripe("sk_test_51Iov1mH463ReSVuZqMseoXxSB8eEtNhIFiMRub8epDcCDD63Ndok1QmBSo1mefIyLPALc7ysxaj4jCqTMNYjRe1i00VSlbri1n")

const app = express()
const port = 3000

app.use(cors({origin: true}))
app.use(express.static("."));
app.use(express.json());

app.post('/api/pay', async (req, res) => {

  let token = await stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 5,
      exp_year: 2022,
      cvc: '314',
    },
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 60,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  console.log(paymentIntent.client_secret)

    return stripe.charges
      .create({
        amount: 60, // Unit: cents
        currency: paymentIntent.currency,
        source: token.id,
        description: 'Test payment',
      })
      .then(result => res.send({clientSecret: paymentIntent.client_secret}))
      .catch(err => console.log("EROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR" + err));
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
