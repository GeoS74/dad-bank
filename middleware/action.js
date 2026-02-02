const db = require('../libs/db');
const { users } = require('../middleware/user');

module.exports.deposit = async (ctx) => {
  const [action, name, amount] = ctx.message.text.split(' ');
  console.log(`${action} ${name} ${amount}`);

  // if(!users.find(u => u.name === name)) {
  //   return ctx.reply(`Не верно указано имя клиента банка!`);
  // }
  ctx.reply(`Пополнение счёта!`);
}

module.exports.withdraw = async (ctx) => {
  const [action, name, amount] = ctx.message.text.split(' ');
  console.log(`${action} ${name} ${amount}`);
  ctx.reply(`Снятие денег!`);
}

module.exports.stateCheck = async (ctx) => {
  const [action, name] = ctx.message.text.split(' ');
  console.log(`${action} ${name}`);
  ctx.reply(`Состояние счёта`);
}