const { Markup } = require('telegraf');

module.exports = (ctx) => {
    const keyboard = Markup.keyboard([
        ['Мой счёт'],
        ['Условия вклада']
    ])
        .resize() // Кнопки подстраиваются под ширину экрана
        .persistent() // Клавиатура остается всегда
        .oneTime(false); // Важно: не одноразовая
    // .oneTime();
    ctx.reply(`Привет!`, keyboard);
}