import { Telegraf, Markup } from 'telegraf';
import { AttendanceService } from '../services/attendance.service';
import { ChatGPTService } from '../services/chatgpt.service';

export function setupCommands(bot: Telegraf) {
    const attendanceService = new AttendanceService();
    const chatGPTService = new ChatGPTService();

    const userSessions: Record<number, { login?: string; password?: string; formattedAttendance?: string }> = {};

    bot.start((ctx) => {
        ctx.reply(
            'Привет! Я бот для проверки посещаемости и общения с GPT. Выберите команду:',
            Markup.keyboard([
                ['📅 Проверить посещаемость', '🔐 Выйти из аккаунта'], // Добавляем кнопку "Выйти из аккаунта"
            ]).resize()
        );
    });

    bot.hears('📅 Проверить посещаемость', async (ctx) => {
        const userId = ctx.from?.id;
        if (!userId) return;

        // Проверяем, есть ли уже сохраненные данные авторизации
        if (userSessions[userId]?.login && userSessions[userId]?.password) {
            try {
                const { login, password } = userSessions[userId];
                const attendance = await attendanceService.checkAttendance(login, password);
                const formattedAttendance = attendance.map(item => `${item.course}: ${item.attendance}`).join('\n');
                ctx.reply(`Ваше посещение:\n${formattedAttendance}`);

                // Store the formatted attendance in the user session
                userSessions[userId].formattedAttendance = formattedAttendance;
                ctx.reply('Теперь вы можете отправить запрос в GPT. Введите ваш запрос:');
            } catch (error) {
                ctx.reply('Не удалось получить данные о посещаемости.');
            }
        } else {
            ctx.reply('Для проверки посещаемости, пожалуйста, авторизуйтесь. Введите ваш логин:');
            userSessions[userId] = {};
        }
    });

    bot.hears('🔐 Выйти из аккаунта', (ctx) => {
        const userId = ctx.from?.id;
        if (!userId) return;

        // Удаляем сохраненные данные авторизации
        delete userSessions[userId].login;
        delete userSessions[userId].password;
        ctx.reply('Вы успешно вышли из аккаунта. Введите ваш логин для повторной авторизации.');
    });

    bot.on('text', async (ctx) => {
        const userId = ctx.from?.id;
        if (!userId) return;

        const session = userSessions[userId];

        if (!session) return;

        if (!session.login) {
            session.login = ctx.message.text;
            ctx.reply('Введите ваш пароль:');
            return;
        }

        if (!session.password) {
            session.password = ctx.message.text;
            ctx.reply('Авторизация прошла успешно! Нажмите на "📅 Проверить посещаемость" для получения данных.');
            return;
        }

        if (true) {
            // User has provided a query after receiving attendance data
            const query = ctx.message.text;
            try {
                const response = await chatGPTService.sendQuery(`${query}`);
                ctx.reply(response);
            } catch (error) {
                ctx.reply('Не удалось получить ответ от GPT.');
            }
            // Reset the formattedAttendance after using it
            session.formattedAttendance = "";
            return;
        }
    });
}
