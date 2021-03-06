const express = require("express");
const path = require("path");
const { Client } = require("pg");
const database = require("./db");
const crypto = require("crypto");
const body_parser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const prenotazione = require("./prenotazione");
const utente = require("./utente");
const res = require("express/lib/response");
const { Router } = require("express");

const app = express(); //inizializzo la web app

const db = database.db; //inizializzo database
db.connect( (err) => {
    if (err) {
	  console.error("Errore connessione al database");
	  console.error(err);
	  process.exit(1);
	}
});

app.use(express.static(path.join(__dirname, "static"))); //specificare dove sono file statici
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(session({ //setto configurazione della sessione
    resave: false,
    saveUninitialized: true,
    secret: crypto.randomBytes(32).toString("hex"),
    //24 hours
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(function(req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = "";
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

function authenticate(email, pass, fn) {
    var check = utente.controlloSeEsisteUtente(db, email);
    if (!check) {
        return fn(null,null);
	}
    else {
		db.query("SELECT passhash FROM utenti WHERE email = $1", [email]).then( (result) => {
            if (!bcrypt.compareSync(pass, result.rows[0].passhash)) {
		        return fn(null, null);
		    }
		    else {
			    return fn(null, email);
		    }
		});
	}
}


function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = "Access denied!";
        res.sendFile(path.join(__dirname, "static/templates/login.html"));
    }
}

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/index.html"));
});

app.get("/chisiamo", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/chisiamo.html"));
});

app.get("/prenota", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/prenota.html"));
});

app.get("/profilo", restrict, (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/profilo.html"));
});

app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/login.html"));
});

app.post("/login", (req,res,next) => {
    if (!req.body.email || !req.body.password) {
	    req.session.error = "Inserire email e password";
	    res.redirect("/login");
    }
    else {
        authenticate(req.body.email, req.body.password, (err, user) => {
            if (err) { return next(err); }
		    if (user) {
                req.session.regenerate(function(err) {
                    req.session.user = user;
				    req.session.success = "Login effettuato con successo";
				    res.redirect("/profilo");
				});   
			}
		    else {
		        req.session.error = "Email o password errati";
				res.redirect("/login");
                
			}
		});
	}
});


app.get("/registrati", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/registrati.html"));
});

app.post("/registrati", (req,res) => {
    if (!req.body.nome || !req.body.cognome || !req.body.email || !req.body.password || !req.body.password2 || !req.body.genere || !req.body.telefono) {
	    req.session.error = "Compilare tutti i campi";
	    return res.redirect("/registrati");
	}
	if (req.body.password !== req.body.password2) {
	    req.session.error = "Le password non coincidono";
	    return res.redirect("/registrati");
	}
    const result = utente.controlloSeEsisteUtente(db, req.body.email);
    if (result == true) {
        req.session.error = "Utente gi?? registrato";
	    return res.redirect("/registrati");
    }
    utente.inserisciUtente(db, req.body.nome, req.body.cognome, req.body.email, req.body.genere, req.body.telefono, bcrypt.hashSync(req.body.password, 10));
    req.session.success = "Registrazione avvenuta con successo";
    req.session.regenerate(function() {
        req.session.user = req.body.email;
	    res.redirect("/profilo");
    });
});


app.get("/logout", (req,res) => {
    req.session.destroy(function() {
	res.redirect("/");
	});
});


app.post("/prenotaSenzaLogin", async (req,res) => {
    var giorno = req.body.giorno;
    var ora = req.body.ora;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var email = req.body.email;
    var genere = req.body.genere;
    var telefono = req.body.telefono;
    var tipo = req.body.tipo;
    var sede = req.body.sede;
    var esiste = false;
    try {
        esiste = await prenotazione.controlloSeEsistePrenotazione(db, giorno, ora, sede)
    }
    catch (e) {
        console.error(e);
        res.send("Errore nella prenotazione");
		return;
    }
    if (esiste) {
		res.sendFile(path.join(__dirname, "static/templates/prenotazionepresente.html"));
	}
    else {
		try{
		    prenotazione.inserisciPrenotazione(db, giorno, ora, nome, cognome, email, genere, telefono, tipo, sede);
		    res.redirect("/");
		}
		catch(e) {
			console.log(e);
			res.send("<p>Errore nell'inserimento della prenotazione</p>");
		    return;
		}
    }
});

app.post("/prenotaConLogin", async (req,res) => {
    var giorno = req.body.giorno;
    var ora = req.body.ora;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var email = req.session.user;
    var genere = req.body.genere;
    var telefono = req.body.telefono;
    var tipo = req.body.tipo;
    var sede = req.body.sede;
    var esiste = false;
    try {
	esiste = await prenotazione.controlloSeEsistePrenotazione(db, giorno, ora, sede)
    }
    catch (e) {
	console.error(e);
	res.send("Errore nella prenotazione");
		return;
    }
    if (esiste) {
		res.sendFile(path.join(__dirname, "static/templates/prenotazionepresente.html"));
	}
    else {
		try{
		    prenotazione.inserisciPrenotazione(db, giorno, ora, nome, cognome, email, genere, telefono, tipo, sede);
	    res.redirect("/prenotazioneffettuata");
	0	}
		catch(e) {
			console.log(e);
			res.send("<p>Errore nell'inserimento della prenotazione</p>");
		    return;
		}
    }
});

app.get("/prenotazioneffettuata", (req,res) => {
    res.sendFile(path.join(__dirname, "static/templates/prenotazioneffettuata.html"));
})

function ensureAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({error: 'user must be logged in.'});
  }
}

app.get("/getUtente", ensureAuth, (req,res) => {
    var email = req.session.user;
    db.query("SELECT * FROM utenti WHERE email = $1", [email])
		.then(result => {
			res.status(200).json(result.rows);
		}).catch(e => { console.error(e.stack) });
});

app.get("/getPrenotazioni", ensureAuth, (req,res) => {
    var email = req.session.user;
    db.query("SELECT * FROM prenotazioni WHERE email = $1", [email])
		.then(result => {
			res.status(200).json(result.rows);
		}).catch(e => { console.error(e.stack) });
});


app.post("/modificaUtente", ensureAuth, (req,res) => {
    var email = req.session.user;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var telefono = req.body.telefono;
	var password = req.body.password;
	var genere = req.body.genere;
	var password2 = req.body.password2;
	if (password === "") {
    	db.query("UPDATE utenti SET nome = $1, cognome = $2, email = $3, genere = $4, telefono = $5 WHERE email = $6", [nome, cognome, email, genere, telefono, req.session.user])
			.then(result => {
				res.sendFile(path.join(__dirname, "static/templates/profiloaggiornato.html"));
			}).catch(e => { console.error(e.stack) });
	}
    else {
	if (password !== password2) {
        res.sendFile(path.join(__dirname, "static/templates/passwordnoncoincidono.html"));
		return;
	}
    db.query("UPDATE utenti SET nome = $1, cognome = $2, email = $3, genere = $4,  telefono = $5, passhash = $6 WHERE email = $7", [nome, cognome, email, genere, telefono, bcrypt.hashSync(password,10), req.session.user])
		.then(result => {
			res.sendFile(path.join(__dirname, "static/templates/profiloaggiornato.html"));
		}).catch(e => { console.error(e.stack) });
	}
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
