const { Client } = require('pg');

function inserisciPrenotazione(client, giorno, ora, nome, cognome, email, genere, telefono,tipo, sede) {
    client.query('INSERT INTO prenotazioni(giorno, ora, nome, cognome, email, genere, telefono,tipo,sede) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [giorno, ora, nome, cognome, email, genere, telefono,tipo,sede], (err, res) => {
	if (err) {
        console.log(err);
	} else {
	    console.log(res.rows);
	}
    });
}

async function controlloSeEsiste(client, giorno, ora, sede) {
    try {
		var result = await client.query('SELECT * FROM prenotazioni WHERE giorno = $1 AND ora = $2 AND sede = $3', [giorno, ora, sede]);
    } catch (err) {
		console.log(err);
		process.exit(1);
    }
    if (result.rows.length > 0) {
        return true;
    } else {
        return false;
    }
}

exports.inserisciPrenotazione = inserisciPrenotazione;
exports.controlloSeEsiste = controlloSeEsiste;
