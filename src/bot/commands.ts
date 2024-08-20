import { Telegraf, Markup } from 'telegraf';
import { AttendanceService } from '../services/attendance.service';
import { ChatGPTService } from '../services/chatgpt.service';

export function setupCommands(bot: Telegraf) {
    const attendanceService = new AttendanceService();
    const chatGPTService = new ChatGPTService();

    const userSessions: Record<number, { login?: string; password?: string }> = {};


    bot.start((ctx) => {
        ctx.reply(
            'Привет! Я бот для проверки посещаемости и общения с GPT. Выберите команду:',
            Markup.keyboard([
                ['📅 Проверить посещаемость'], // Кнопка для проверки посещаемости
            ]).resize() // Устанавливаем клавиатуру
        );
    });

    bot.hears('📅 Проверить посещаемость', async (ctx) => {
        const userId = ctx.from?.id;
        if (!userId) return;

        if (!userSessions[userId]?.login || !userSessions[userId]?.password) {
            ctx.reply('Для проверки посещаемости, пожалуйста, авторизуйтесь. Введите ваш логин:');
            userSessions[userId] = {}; // Инициализируем сессию пользователя
            return;
        }

        try {
            const { login, password } = userSessions[userId];
            const attendance = await attendanceService.checkAttendance(login, password);
            const formattedAttendance = attendance.map(item => `${item.course}: ${item.attendance}`).join('\n');
            ctx.reply(`Ваше посещение:\n${formattedAttendance}`);
        } catch (error) {
            ctx.reply('Не удалось получить данные о посещаемости.');
        }
    });


    bot.on('text', async (ctx) => {
        const userId = ctx.from?.id;
        if (!userId) return;

        const session = userSessions[userId];

        if (!session?.login) {
            session.login = ctx.message.text;
            ctx.reply('Введите ваш пароль:');
            return;
        }

        if (!session.password) {
            session.password = ctx.message.text;
            ctx.reply('Авторизация прошла успешно! Нажмите на "📅 Проверить посещаемость" для получения данных.');
            return;
        }

        try {
            const response = await chatGPTService.sendQuery(ctx.message.text);
            ctx.reply(response);
        } catch (error) {
            ctx.reply('Не удалось получить ответ от GPT.');
        }
    });

}
