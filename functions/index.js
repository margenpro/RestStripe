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

app.get("/a" , (req, res) =>{
  res.send("Heeeeeeeeeeeee")
})

app.post('/api/pay', async (req, res) => {
console.log("wgsgsdgdsgdsgsd");


    return stripe.charges
      .create({
        amount: 60, // Unit: cents
        currency: "cad",
        source: req.body.token,
        description: 'Test payment',
      })
      .then(result => res.status(200).send({status:result.status}))
      .catch(err => res.status(402).send({code: err.decline_code}));
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
