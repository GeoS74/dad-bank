const { Telegraf, Markup } = require('telegraf');
const logger = require('./libs/logger');
const config = require('./config');
const {isUserAllowed, user, isDady, checkNameUser} = require('./middleware/user');
const keyboard = require('./middleware/keyboard');
const {deposit, withdraw, stateCheck} = require('./middleware/action');

const bot = new Telegraf(config.bot.token);

bot.use(isUserAllowed, user);
bot.start(keyboard);

bot.hears('Мой счёт', ctx => {
    ctx.reply('Привет Алиса! У тебя на счёте 2523 р.');
});

bot.hears(/^пополнить\s+\S+\s+\d+$/i, isDady, checkNameUser, deposit);
bot.hears(/^снять\s+\S+\s+\d+$/i, isDady, checkNameUser, withdraw);
bot.hears(/^депозит\s+\S+$/i, isDady, checkNameUser, stateCheck);

bot.hears('Условия вклада', ctx => {
    ctx.reply(`Привет, ${ctx.user.name}! Вот условия вклада в Папа-Банке:\n
        1) процентная ставка по вкладу составляет 10% в месяц;\n
        2) проценты по вкладу начисляются на остаток по счёту до 15-го числа;
        3) пополнять и снимать деньги можно в любой момент;\n
        `);
});

bot.help(isDady, ctx => {
    ctx.reply(`Основные команды:\n
        1) Пополнить Имя Сумма\n
        2) Снять Имя Сумма\n
        3) Депозит Имя\n
        `);
});

bot.launch(() => logger.info('bot started'));