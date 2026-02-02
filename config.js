require('dotenv').config({ path: './secret.env', override: true });

module.exports = {
  bot: {
    token: process.env.BOT_TOKEN || null,
  },
  users: {
    allowed: process.env.USERS_ALLOWED || null,
  },
  postgres: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'dadbank',
    password: process.env.DB_PASS || 'admin',
    port: process.env.DB_PORT || 5432,
  },
  log: {
    file: 'app.log',
  },
};