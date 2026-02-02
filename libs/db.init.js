const { Pool } = require('pg');

const config = require('../config');
const logger = require('./logger');

const data = {
  user: config.postgres.user,
  host: config.postgres.host,
  database: '',
  password: config.postgres.password,
  port: config.postgres.port,
};

(async () => {
  let pool = new Pool(data);

  // dropped database
  if (process.argv[2] === '--drop') {
    await pool.query(`DROP DATABASE ${config.postgres.database}`)
      .then(() => logger.info(`database "${config.postgres.database}" dropped`))
      .catch((error) => logger.warn(error.message))
      .finally(() => process.exit());
  }

  // created database
  await pool.query(`CREATE DATABASE ${config.postgres.database}`)
    .then(() => logger.info(`create database "${config.postgres.database}"`))
    .catch((error) => logger.warn(error.message));

  // connect new database
  data.database = config.postgres.database;
  pool = new Pool(data);

  // created tables
  await pool.query(`
    CREATE TABLE transaction (
      id SERIAL PRIMARY KEY,
      createdat TIMESTAMP NOT NULL DEFAULT NOW(),
      username TEXT NOT NULL,
      action TEXT NOT NULL,
      price REAL NOT NULL
    );
  `)
    .then(() => logger.info('create table "transaction"'))
    .catch((error) => logger.warn(error.message));

  logger.info('database init complete');
  process.exit();
})();
