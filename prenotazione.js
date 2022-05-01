const { Client } = require('pg');

function inserisciPrenotazione(client, giorno, ora, nome, cognome, email, genere, telefono,tipo, sede) {
    client.query('INSERT INTO prenotazioni(giorno, ora, nome, cognome, email, genere, telefono,tipo,sede) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [giorno, ora, nome, cognome, email, genere, telefono,tipo,sede], (err, res) => {
	if (err) {
        throw err;
	} else {
	    console.log(res.rows);
	}
    });
}

function controlloSeEsiste(client, giorno, ora, sede, fn) {
    client.query('SELECT * FROM prenotazioni WHERE giorno = $1 AND ora = $2 AND sede = $3', [giorno, ora, sede], (err, res) => {
	if (err) {
        throw err;
	} 
    else {
          if (res.rows.length > 0) {
		      fn(true);
	      }
          else {
              fn(false)
		  }
       } 
    });
}

exports.inserisciPrenotazione = inserisciPrenotazione;
exports.controlloSeEsiste = controlloSeEsiste;
