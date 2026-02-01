const { Telegraf, Markup } = require('telegraf');
const config = require('./config');

const bot = new Telegraf(config.bot.token);

// bot.use(errorInterceptor, user);
bot.start(ctx => {
    const keyboard = Markup.keyboard([
        ['Мой счёт'],
        ['Помощь']
    ])
    .resize();
    // .oneTime();
    ctx.reply(`Привет!`, keyboard);
});



// bot.help(help);
// bot.on('sticker', sticker);
// bot.on('text', ctx => {
//     ctx.reply('message');
// });

bot.hears('Мой счёт', ctx => {
    ctx.reply('Привет Алиса! У тебя на счёте 2523 р.');
});

bot.on('text', ctx => {
    ctx.reply('Добро пожаловать в Папа-Банк, функционал дорабатывается');
});

bot.launch();