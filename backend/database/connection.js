require('dotenv').config();
const knex = require('knex');

var db = knex({
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      timezone: 'America/Sao_Paulo',
      dateStrings: true
    },
    pool: { min: 0, max: 7 }
  });

module.exports = db;

