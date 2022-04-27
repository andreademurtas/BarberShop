const { Client  } = require('pg');
const dbconfig = require('dbconfig');

const utenti_client = new Client({
  user: 'postgres',
  host: 'ec2-107-23-144-168.compute-1.amazonaws.com',
  database: 'utenti',
  password: dbconfig.dbpassword,
  port: 5432,
});


const prenotazioni_client = new Client({
  user: 'postgres',
  host: 'ec2-107-23-144-168.compute-1.amazonaws.com',
  database: 'prenotazioni',
  password: dbconfig.dbpassword,
  port: 5432,
});

exports.utenti_client = utenti_client;
exports.prenotazioni_client = prenotazioni_client;
