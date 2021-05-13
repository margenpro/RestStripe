const functions = require("firebase-functions");
const express = require("express");

//
const cors = require("cors");

const app = express();
// OJO: esto habilita peticiones con cualquier origen.
app.use(cors({ origin: true }));


app.get("/", (req, res) => {
    return res.status(200).send("Estoy en el GET /");
});
app.get("/hello-world", (req, res) => {
    return res.status(200).send("Hola mundo!!!!!");
});


exports.app = functions.https.onRequest(app);
