const config = require('../config');

const usersAllowed = config.users.allowed.split(',');
const users = [];

usersAllowed.map(u => {
  const user = u.split(':');

  users.push({
    id: Number(user[1]),
    name: user[0],
  });
})

module.exports.users = users;

module.exports.isUserAllowed = async (ctx, next) => {
  const userID = ctx.from?.id;

  if (!userID) {
    return ctx.reply('⛔ не удалось определить пользователя');
  }
  if (!users.find(u => u.id === userID)) {
    return ctx.reply('⛔ У вас нет доступа к этому боту');
  }
  return await next();
}

module.exports.user = async (ctx, next) => {
  const userID = ctx.from?.id;
  ctx.user = users.find(u => u.id === userID);
  return await next();
}

module.exports.isDady = async (ctx, next) => {
  if (ctx.user.name !== 'Папа') {
    return ctx.reply('⛔ Вы не можете изменять счёт');
  }
  return await next();
}

module.exports.checkNameUser = async (ctx, next) => {
  const [action, name] = ctx.message.text.split(' ');
  if(!users.find(u => u.name === name)) {
    return ctx.reply(`Не верно указано имя клиента банка!`);
  }
  return await next();
}