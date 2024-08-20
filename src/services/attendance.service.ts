import axios from 'axios';
const https = require('https');
import * as cheerio from 'cheerio';
import {config} from '../config/config';

export class AttendanceService {
    private baseUrl: string;
    private url: string;
    private login: string;
    private password: string;
    private modstring: string;
    private LogIn: string;
    private mod: string;

    constructor() {
        this.baseUrl = config.sduBaseUrl;
        this.login = config.sduLogin;
        this.password = config.sduPassword;
        this.modstring = '';
        this.LogIn = config.logIn;
        this.url = config.sduScheduleUrl;
        this.mod = config.mod;
    }

    async checkAttendance(login: string, password: string): Promise<any> {
        try {
            // Отправляем запрос на авторизацию с пользовательскими данными
            const loginResponse = await axios.post(this.baseUrl, new URLSearchParams({
                username: login,
                password: password,
                modstring: this.modstring,
                LogIn: this.LogIn
            }).toString(), {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': '_ga_158WYDBDSD=GS1.1.1715978932.111.1.1715979801.0.0.0; _ym_d=1716931373; _ga_9DTH4C89K9=GS1.1.1724071605.5.0.1724071605.60.0.2104713924; _gcl_au=1.1.1481813476.1724071606; uname=230103089; _gid=GA1.3.1748307181.1724090229; PHPSESSID=ltpbnc65njef9i559jmbvps26j; _ga_158WYDBDSD=GS1.1.1715978932.111.1.1715979801.0.0.0; _ym_d=1716931373; _ga_9DTH4C89K9=GS1.1.1724071605.5.0.1724071605.60.0.2104713924; _gcl_au=1.1.1481813476.1724071606; _ym_isad=2; _gat_gtag_UA_74095867_6=1; _gid=GA1.3.1748307181.1724090229; _ga_MZTH0GPMY5=GS1.1.1724089738.298.1.1724090229.39.0.0; _ga=GA1.1.956875055.1724090178; _ga=GA1.3.956875055.1724090178; _ga_MZTH0GPMY5=GS1.1.1724151822.300.1.1724152733.60.0.0',
                    'Host': 'my.sdu.edu.kz',
                    'Origin': 'https://my.sdu.edu.kz',
                    'Referer': 'https://my.sdu.edu.kz/index.php',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });

            console.log("auth successful")



            const attendanceResponse = await axios.get(this.url, {

                params: {
                    mod: this.mod
                },
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Connection': 'keep-alive',
                    'Cookie': '_ga_158WYDBDSD=GS1.1.1715978932.111.1.1715979801.0.0.0; _ym_d=1716931373; _ga_9DTH4C89K9=GS1.1.1724071605.5.0.1724071605.60.0.2104713924; _gcl_au=1.1.1481813476.1724071606; _gid=GA1.3.1748307181.1724090229; PHPSESSID=ltpbnc65njef9i559jmbvps26j; _ga_158WYDBDSD=GS1.1.1715978932.111.1.1715979801.0.0.0; _ym_d=1716931373; _ga_9DTH4C89K9=GS1.1.1724071605.5.0.1724071605.60.0.2104713924; _gcl_au=1.1.1481813476.1724071606; _ym_isad=2; _gat_gtag_UA_74095867_6=1; _gid=GA1.3.1748307181.1724090229; _ga_MZTH0GPMY5=GS1.1.1724089738.298.1.1724090229.39.0.0; _ga=GA1.1.956875055.1724090178; _ga=GA1.3.956875055.1724090178; _ga_MZTH0GPMY5=GS1.1.1724154617.301.1.1724154637.40.0.0',
                    'Host': 'my.sdu.edu.kz',
                    'Referer': 'https://my.sdu.edu.kz/index.php?mod=schedule',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });

            const $ = cheerio.load(attendanceResponse.data);

            const attendanceData: { course: string; attendance: string }[] = [];

            $('table.clTbl tr').each((i, element) => {
                if (i === 0) return; // Skip the header row

                const courseName = $(element).find('td').eq(2).text().trim();
                const styleAttr = $(element).find('.QaibBarPercent').attr('style');
                const attendancePercent = styleAttr ? styleAttr.match(/width:(\d+)%/)?.[1] : '0';

                attendanceData.push({
                    course: courseName,
                    attendance: `${attendancePercent}%`,
                });
            });

            console.log(attendanceData);

            return attendanceData;
        } catch (error) {
            console.error('Error checking attendance:', error);
            throw new Error('Failed to check attendance.');
        }
    }
}
