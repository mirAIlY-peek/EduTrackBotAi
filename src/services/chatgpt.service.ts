import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';
import {config} from "../config/config";

export class ChatGPTService {
    private openai: OpenAI;


    constructor() {
        this.openai = new OpenAI({
            apiKey: config.openaiApiKey
        });
    }

    async sendQuery(prompt: string): Promise<string | null> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user",
                    content: prompt
                }],
            });
            console.log(completion.choices[0].message.content+"\n ");
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API error:', error);
            throw new Error('Failed to generate a response.');
        }
    }
}
