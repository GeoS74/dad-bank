const db = require('../libs/db');

module.exports.deposit = async (ctx) => {
  const [action, username, price] = ctx.message.text.split(' ');
  await _deposit(action, username, price);
  ctx.reply(`Деньги внесены на счёт!`);
}

module.exports.withdraw = async (ctx) => {
  const [action, username, price] = ctx.message.text.split(' ');
  await _deposit(action, username, -price);
  ctx.reply(`Снятие денег!`);
}

module.exports.stateCheck = async (ctx) => {
  const [action, username] = ctx.message.text.split(' ');

  let state = await _stateCheck(username);

  if(!state) {
    return ctx.reply(`Состояние счёта ${username}\nдоступный остаток: 0 р.`);
  }

  state = state.toLocaleString('ru-RU', {
    maximumFractionDigits: 0
  });

  ctx.reply(`Состояние счёта ${username}\n
      доступный остаток: ${state} р.
    `);
}

async function _deposit(username, action, price) {
  return db.query(`INSERT INTO transaction
    (action, username, price)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [username, action, price]);
}

async function _stateCheck(username) {
  return db.query(`SELECT sum(price) as sum FROM transaction WHERE username=$1`,
    [username])
    .then((res) => res.rows[0]?.sum);
}

module.exports.stateMyCheck = async (ctx) => {
  let state = await _stateCheck(ctx.user.name);

  if(!state) {
    return ctx.reply(`Привет, ${ctx.user.name}!\nдоступный остаток по счёту: 0 р.`);
  }

  state = state.toLocaleString('ru-RU', {
    maximumFractionDigits: 0
  });

  ctx.reply(`Привет ${ctx.user.name}!\nдоступный остаток по счёту: ${state} р.`);
}