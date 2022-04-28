const { Client  } = require('pg');
const dbconfig = require('./dbconfig');

const db = new Client({
  user: 'postgres',
  host: 'ec2-107-23-144-168.compute-1.amazonaws.com',
  database: 'barbershop',
  password: dbconfig.dbpassword,
  port: 5432,
});

exports.db = db;
