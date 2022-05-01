const { Client } = require('pg');

function inserisciUtente(client, nome, cognome, email, genere, telefono, passhash) {
    const query = {
	text: 'INSERT INTO utenti(nome, cognome, email, genere, telefono, passhash) VALUES($1, $2, $3, $4, $5, $6)',
	values: [nome, cognome, email, genere, telefono, passhash]
    };
    client.query(query, (err, res) => {
	if (err) {
	    console.log(err.stack);
	} else {
	    console.log(res.rows);
	}
    });
}

async function controlloSeEsisteUtente(client, email) {
    try {
	    const query = {
	        text: 'SELECT * FROM utenti WHERE email = $1',
	        values: [email]
	    };
	    var result = await client.query(query);
    } catch (err) {
	    console.log(err.stack);
		process.exit(1);
    }
    return result.rows.length > 0;
}

async function getPasshash(client, email) {
    try {
	    const query = {
	        text: 'SELECT passhash FROM utenti WHERE email = $1',
	        values: [email]
	    };
	    var result = await client.query(query);
    } catch (err) {
	    console.log(err.stack);
		process.exit(1);
    }
    return result.rows[0].passhash;
}

exports.inserisciUtente = inserisciUtente;
exports.controlloSeEsisteUtente = controlloSeEsisteUtente;
exports.getPasshash = getPasshash;
