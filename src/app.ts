import express from 'express';
import { startBot } from './bot/bot';

const app = express();
app.use(express.json());

// Запуск Telegram бота
startBot();

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
