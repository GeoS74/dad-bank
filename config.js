require('dotenv').config({ path: './secret.env', override: true });

module.exports = {
  bot: {
    token: process.env.BOT_TOKEN || null,
  },
};