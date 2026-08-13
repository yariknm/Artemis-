const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const PORT_WEB = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('AFK-бот активен!'));
app.listen(PORT_WEB, () => console.log(`Веб-сервер работает`));

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Dertytys.aternos.me', 
    port: 53136,             
    username: 'Dertytys_AFK_' + Math.floor(Math.random() * 100),
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('✅ Бот успешно зашел на сервер!');
    setInterval(() => {
      const actions = ['jump', 'left', 'right'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(randomAction, true);
      setTimeout(() => bot.setControlState(randomAction, false), 600);
    }, 20000); 
  });

  bot.on('end', () => {
    console.log('🔁 Отключение. Перезаход через 15 сек...');
    setTimeout(startBot, 15000); 
  });

  bot.on('error', (err) => console.log('⚠️ Ошибка:', err.message));
}
startBot();
