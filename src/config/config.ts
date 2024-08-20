import dotenv from 'dotenv';

dotenv.config();

export const config = {
    telegramToken: process.env.TELEGRAM_TOKEN,
    openaiApiKey: process.env.OPENAI_API,
    sduLogin: process.env.SDU_LOGIN,
    sduPassword: process.env.SDU_PASSWORD,
    sduBaseUrl: process.env.SDU_BASE_URL,
    sduScheduleUrl: process.env.SDU_SCHED,
    logIn: process.env.LOG_IN,
    mod:process.env.MOD
};
