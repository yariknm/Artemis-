const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const PORT_WEB = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Бот штурмует Aternos!'));
app.listen(PORT_WEB, () => console.log(`Веб-сервер активен`));

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Dertytys.aternos.me', 
    port: 53136,             
    username: 'Dertytys_AFK_' + Math.floor(Math.random() * 100),
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('🎉 УРА! Бот успешно пробился на сервер!');
    setInterval(() => {
      const actions = ['jump', 'left', 'right'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(randomAction, true);
      setTimeout(() => bot.setControlState(randomAction, false), 600);
    }, 20000); 
  });

  bot.on('end', () => {
    // Уменьшаем задержку до 3 секунд для агрессивного перезахода (пробиваем защиту Aternos)
    console.log('🔁 Сброс соединения. Быстрая попытка пробиться через 3 секунды...');
    setTimeout(startBot, 3000); 
  });

  bot.on('error', (err) => {
    console.log('⚠️ Ошибка (пробиваемся дальше):', err.message);
    // При ошибке сокета тоже пробуем зайти заново через 3 секунды
    setTimeout(startBot, 3000);
  });
}
startBot();
