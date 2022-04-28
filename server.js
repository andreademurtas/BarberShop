const express = require("express");
const path = require("path");
const { Client } = require("pg");
const database = require("./db");

const app = express();
const db = database.db;
db.connect( (err) => {
    if (err) {
	  console.error("Errore connessione al database");
	  console.error(err);
	  process.exit(1);
	}
});

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

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
