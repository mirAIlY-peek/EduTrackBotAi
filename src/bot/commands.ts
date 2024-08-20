import { Telegraf } from 'telegraf';
import { AttendanceService } from '../services/attendance.service';
import { ChatGPTService } from '../services/chatgpt.service';

export function setupCommands(bot: Telegraf) {
    const attendanceService = new AttendanceService();
    const chatGPTService = new ChatGPTService();

    bot.start((ctx) => {
        ctx.reply('Привет! Я бот для проверки посещаемости и общения с GPT. Введи команду /attendance для проверки посещаемости или напиши мне сообщение для общения с GPT.');
    });

    bot.command('attendance', async (ctx) => {
        try {
            const attendance = await attendanceService.checkAttendance();
            const formattedAttendance = attendance.map(item => `${item.course}: ${item.attendance}`).join('\n');
            ctx.reply(`Ваше посещение:\n${formattedAttendance}`);
        } catch (error) {
            ctx.reply('Не удалось получить данные о посещаемости.');
        }
    });

    bot.on('text', async (ctx) => {
        try {
            const response = await chatGPTService.sendQuery(ctx.message.text);
            ctx.reply(response);
        } catch (error) {
            ctx.reply('Не удалось получить ответ от GPT.');
        }
    });
}
