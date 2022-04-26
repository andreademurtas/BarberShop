const express = require("express");
const path = require("path");
const { Client } = require("pg");
const db = require("./db");

const app = express();
const utenti_client = db.utenti_client;
const prenotazioni_client = db.prenotazioni_client;
utenti_client.connect();
prenotazioni_client.connect();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/index.html"));
});

app.get("/chisiamo", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/chisiamo.html"));
});

app.get("/database", (req,res) => {
    var response = '';
    utenti_client.query("SELECT NOW() AS now").then(result => {
      res.send('<p>' + result.rows[0].now + '</p>');
	}).catch(e => {
      response += e;
    });
});

app.get("/prenota", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/prenota.html"));
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
