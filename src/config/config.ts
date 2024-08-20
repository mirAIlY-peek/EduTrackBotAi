import dotenv from 'dotenv';

dotenv.config();

export const config = {
    telegramToken: process.env.TELEGRAM_TOKEN,
    openaiApiKey: process.env.OPENAI_API,
    sduLogin: process.env.SDU_LOGIN,
    sduPassword: process.env.SDU_PASSWORD,
    sduBaseUrl: 'https://my.sdu.edu.kz/',
};
