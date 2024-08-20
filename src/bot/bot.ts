import { Telegraf } from 'telegraf';
import { config } from '../config/config';
import { setupCommands } from './commands';

export const bot = new Telegraf(config.telegramToken);

setupCommands(bot);

export function startBot() {
    bot.launch().then(() => {
        console.log('Telegram бот запущен.');
    }).catch((error) => {
        console.error('Ошибка запуска Telegram бота:', error);
    });
}
