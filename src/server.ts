const http = globalThis.require("http");
// src/server.ts


interface ColorScheme {
    primary: string;
    secondary: string;
}

export class CalendarServer {
    private server: any;
    private port: number;
    private colorSchemes: { [key: string]: ColorScheme } = {
        red: { primary: "#DD2F45", secondary: "#F4BEC3" },
        blue: { primary: "#2bb7ff", secondary: "#0097e6" },
        yellow: { primary: "#feca57", secondary: "#ff9f43" },
        green: { primary: "#55efc4", secondary: "#19b37a" },
        purple: { primary: "#a55eea", secondary: "#8854d0" },
        pink: { primary: "#fd79a8", secondary: "#e05b8a" },
        orange: { primary: "#ff7f50", secondary: "#ff6348" },
        grey: { primary: "#576574", secondary: "#222f3e" }
    };

    constructor(port: number) {
        this.port = port;
    }

    public start(): void {
        if (!this.server) {
            this.server = http.createServer((req: any, res: any) => {
                const url = new URL(req.url, `http://localhost${this.port}`);
                const params = {
                    color: url.searchParams.get('color') || '',
                    date: url.searchParams.get('date'),
                    locale: url.searchParams.get('locale') || 'cn',
                    type: url.searchParams.get('type') || '1',
                    content: url.searchParams.get('content') || ''
                };

                const svg = this.generateCalendarSVG(params);
                res.writeHead(200, {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                });
                res.end(svg);
            });

            this.server.listen(this.port);
            console.log(`Calendar SVG server started on port ${this.port}`);
        }
    }

    public stop(): void {
        if (this.server) {
            this.server.close();
            this.server = null;
            console.log(`Calendar SVG server stopped`);
        }
    }
    private getDateInfo(dateStr: string | null, locale: string): {
        year: number, month: string, day: number, date: string, weekday: string, weekdayShort: string, week: string, daysUntilToday: number 
    } {
        const date = dateStr ? new Date(dateStr) : new Date();

        // Calculate the week number
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000);
        const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);

        const weekString = locale === 'en' ? `${weekNumber}W` : `${weekNumber}周`;

        // Calculate days until today
        const today = new Date();
        date.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const timeDifference = date.getTime() - today.getTime();
        const daysUntilToday = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));


        return {
            year: date.getFullYear(),
            month: date.toLocaleString(locale, { month: 'short' }).toUpperCase(),
            day: date.getDate(),
            date: `${ (date.getMonth() + 1).toString().padStart(2, '0') }-${ date.getDate().toString().padStart(2, '0') }`,
            weekday: date.toLocaleString(locale, { weekday: 'long' }),
            weekdayShort: date.toLocaleString(locale, { weekday: 'short' }),
            week: weekString,
            daysUntilToday: daysUntilToday
        };
    }


    private generateCalendarSVG(params: { color: string, date: string | null, locale: string, type: string }): string {
        const type = params.type || '1';

        switch (type) {
            case '1':
                return this.generateTypeOneSVG(params);
            case "2":
                return this.generateTypeTwoSVG(params);
            case '3':
                return this.generateTypeThreeSVG(params);
            case '4':
                return this.generateTypeFourSVG(params);
            case '5':
                return this.generateTypeFiveSVG(params);
            case '6':
                return this.generateTypeSixSVG(params);
            case '7':
                return this.generateTypeSevenSVG(params);
            case '8':
                return this.generateTypeEightSVG(params);
            default:
                return this.generateTypeOneSVG(params);
        }
    }
    // Type 1: 显示年月日星期
    private generateTypeOneSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        return `
        <svg id="dynamic_icon_type1" data-name="dynamic_icon_type1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 504.5">
        <path d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
        <path d="M39,0h434c21.52,0,39,17.48,39,39v146H0V39C0,17.48,17.48,0,39,0Z" style="fill: ${colorScheme.primary};"/>
        <text id="month" transform="translate(22 146.5)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 100px;">${dateInfo.month}</text>
        <text id="day" transform="translate(260 392.5)" style="fill: #66757f; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 240px; text-anchor: middle">${dateInfo.day}</text>
        <text id="weekday" transform="translate(260 472.5)" style="fill: #66757f; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 64px; text-anchor: middle">${dateInfo.weekday}</text>
        <text id="year"  transform="translate(331.03 148.44)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 71.18px;">${dateInfo.year}</text>
        </svg>
            `;
    }
    // Type 2: 显示年月日
    private generateTypeTwoSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        return `
        <svg id="dynamic_icon_type2" data-name="dynamic_icon_type2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 504.5">
        <path d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
        <path d="M39,0h434c21.52,0,39,17.48,39,39v146H0V39C0,17.48,17.48,0,39,0Z" style="fill: ${colorScheme.primary};"/>
        <text id="month" transform="translate(22 146.5)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 100px;">${dateInfo.month}</text>
        <text  id="day" transform="translate(260 420.5)" style="fill: #66757f; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 256px;text-anchor: middle">${dateInfo.day}</text>
        <text id="year" transform="translate(331.03 148.44)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 71.18px;">${dateInfo.year}</text>
        </svg>
            `;
    }
    // Type 3: 显示年月
    private generateTypeThreeSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        return `
            <svg id="dynamic_icon_type3" data-name="dynamic_icon_type3" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 504.5">
                <path class="cls-6" d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
                <path class="cls-1" d="M39,0h434c21.5,0,39,17.5,39,39v146H0V39C0,17.5,17.5,0,39,0Z" style="fill: ${colorScheme.primary};"/>
                <g style="fill: ${colorScheme.secondary};">
                    <circle  cx="468.5" cy="135" r="14"/>
                    <circle  cx="468.5" cy="93" r="14"/>
                    <circle  cx="425.5" cy="135" r="14"/>
                    <circle  cx="425.5" cy="93" r="14"/>
                    <circle  cx="382.5" cy="135" r="14"/>
                    <circle  cx="382.5" cy="93" r="14"/>
                </g>
                <text id="year" transform="translate(22 146.5)" style="fill: #fff;font-size: 120px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${dateInfo.year}</text>
                <text id="month" transform="translate(260 410.5)" style="fill: #66757f;font-size: 160px;text-anchor: middle;font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${dateInfo.month}</text>
            </svg>
            `;
    }

    // Type 4: 仅显示年
    private generateTypeFourSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        return `
            <svg id="dynamic_icon_type4" data-name="dynamic_icon_type4" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 504.5">
                <path class="cls-6" d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
                <path class="cls-1" d="M39,0h434c21.5,0,39,17.5,39,39v146H0V39C0,17.5,17.5,0,39,0Z" style="fill: ${colorScheme.primary};"/>
                <g style="fill: ${colorScheme.secondary};">
                    <circle  cx="468.5" cy="135" r="14"/>
                    <circle  cx="468.5" cy="93" r="14"/>
                    <circle  cx="425.5" cy="135" r="14"/>
                    <circle  cx="425.5" cy="93" r="14"/>
                    <circle  cx="382.5" cy="135" r="14"/>
                    <circle  cx="382.5" cy="93" r="14"/>
                </g>
                <text id="month" transform="translate(260 410.5)" style="fill: #66757f;font-size: 180px;text-anchor: middle;font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${dateInfo.year}</text>
            </svg>
            `;
    }

    // Type 5: 显示周数
    private generateTypeFiveSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        return `
            <svg id="dynamic_icon_type5" data-name="dynamic_icon_type5" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 504.5">
                <path class="cls-6" d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
                <path class="cls-1" d="M39,0h434c21.5,0,39,17.5,39,39v146H0V39C0,17.5,17.5,0,39,0Z" style="fill: ${colorScheme.primary};"/>
                <g style="fill: ${colorScheme.secondary};">
                    <circle  cx="468.5" cy="135" r="14"/>
                    <circle  cx="468.5" cy="93" r="14"/>
                    <circle  cx="425.5" cy="135" r="14"/>
                    <circle  cx="425.5" cy="93" r="14"/>
                    <circle  cx="382.5" cy="135" r="14"/>
                    <circle  cx="382.5" cy="93" r="14"/>
                </g>
                <text id="year" transform="translate(22 146.5)" style="fill: #fff;font-size: 120px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${dateInfo.year}</text>
                <text id="month" transform="translate(260 410.5)" style="fill: #66757f;font-size: 200px;text-anchor: middle;font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${dateInfo.week}</text>
            </svg>
            `;
    }
    // Type 6 显示星期
    private generateTypeSixSVG(params: { color: string, date: string | null, locale: string }): string {
        let colorScheme;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        // 如果params.color=='', 根据dateInfo.weekday的值来设置颜色，周一到周五默认为红色，周六到周日默认为蓝色
        const date = params.date ? new Date(params.date) : new Date();
        // 获取今天是星期几
        const weekday = date.toLocaleString('en-US', { weekday: 'long' });
        if (params.color === "") {
            // 如果星期是周六或周日，设置为绿色
            if (weekday === 'Saturday' || weekday === 'Sunday') {
                colorScheme = this.colorSchemes.blue;
            } else {
                colorScheme = this.colorSchemes.red;
            }
        } else {
            colorScheme = this.colorSchemes[params.color.toLowerCase()];
        }

        return `
            <svg id="dynamic_icon_type6" data-name="dynamic_icon_type6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 504.5">
            <path id="center" d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
            <path id="top" d="M39,0h434c21.5,0,39,14,39,31.2v116.8H0V31.2C0,14,17.5,0,39,0Z" style="fill: ${colorScheme.primary};"/>
            <g id="cirle" style="fill: ${colorScheme.secondary};">
                <circle cx="468.5" cy="113.5" r="14"/>
                <circle cx="468.5" cy="71.5" r="14"/>
                <circle cx="425.5" cy="113.5" r="14"/>
                <circle cx="425.5" cy="71.5" r="14"/>
                <circle cx="382.5" cy="113.5" r="14"/>
                <circle cx="382.5" cy="71.5" r="14"/>
            </g>
            <text id = "weekday" transform="translate(260 380)" style="fill: ${colorScheme.primary}; font-size: 210px; text-anchor: middle; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei';">${dateInfo.weekdayShort}</text>
            </svg>`;
    }
    private generateTypeSevenSVG(params: { color: string, date: string | null, locale: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        const dateInfo = this.getDateInfo(params.date, params.locale);
        const diffDays = dateInfo.daysUntilToday;

        let tipText = '';
        let diffDaysText = '';

        if (diffDays === 0) {
            tipText = params.locale === 'en' ? 'Today' : '今天';
            diffDaysText = '--';
        } else if (diffDays > 0) {
            tipText = params.locale === 'en' ? 'Left' : '还有';
            diffDaysText = diffDays.toString();
        } else {
            tipText = params.locale === 'en' ? 'Past' : '已过';
            diffDaysText = Math.abs(diffDays).toString();
        }
        let dayStr = params.locale === 'en' ? 'days' : '天';
        // 根据倒数天数长度调整字体大小
        let fontSize;
        if (diffDaysText.length >= 6) {
            fontSize = 130;
        } else if (diffDaysText.length == 5) {
            fontSize = 140;
        } else if (diffDaysText.length === 4) {
            fontSize = 190;
        } else  {
            fontSize = 240;
        }


        return `
        <svg id="dynamic_icon_type7" data-name="dynamic_icon_type7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 504.5">
            <path id="bottom" d="M512,447.5c0,32-25,57-57,57H57c-32,0-57-25-57-57V120.5c0-31,25-57,57-57h398c32,0,57,26,57,57v327Z" style="fill: #ecf2f7;"/>
            <path id="top" d="M39,0h434c21.52,0,39,17.48,39,39v146H0V39C0,17.48,17.48,0,39,0Z" style="fill: ${colorScheme.primary};"/>
            <text id="year" transform="translate(46.1 78.92)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 60px;">${dateInfo.year}</text>
            <text id="day" transform="translate(43.58 148.44)" style="fill: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 60px;">${dateInfo.date}</text>g>
            <text id="passStr" transform="translate(400 148.44)" style="fill: #fff; text-anchor: middle;font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; font-size: 71.18px;">${tipText}</text>
            <text id="diffDays" x="260" y="76%" style="font-size: ${fontSize}; fill: #66757f; text-anchor: middle; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${diffDaysText}</text>
            <text id="dayStr" transform="translate(260 472.5)" style="font-size: 64px; text-anchor: middle; fill: #66757f; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei';">${dayStr}</text>
        </svg>`;
    }




    private generateTypeEightSVG(params: { color: string, date: string | null, locale: string, content: string }): string {
        const colorScheme = this.colorSchemes[params.color.toLowerCase()] || this.colorSchemes.red;
        let content = params.content || '';
        let fontSize;

        // 判断内容是否包含中文字符
        const isChinese = /[\u4e00-\u9fa5]/.test(content);

        // 根据长度调整字体大小
        switch (content.length) {
            case 1:
                fontSize = isChinese ? 320 : 315.857143;
                break;
            case 2:
                fontSize = isChinese ? 240 : 267.857143;
                break;
            case 3:
                fontSize = isChinese ? 160 : 206.857143;
                break;
            case 4:
                fontSize = isChinese ? 120 : 190.857143;
                break;
            case 5:
                fontSize = isChinese ? 95 : 146.857143;
                break;
            default:
                fontSize = isChinese ? 480 / content.length : 750 / content.length;
        }

        return `
        <svg id="dynamic_icon_type8" data-name="dynamic_icon_type8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 511">
            <path d="M39,0h434c20.97,0,38,17.03,38,38v412c0,33.11-26.89,60-60,60H60c-32.56,0-59-26.44-59-59V38C1,17.03,18.03,0,39,0Z" style="fill: ${colorScheme.primary};"/>
            <text x="260px"  y="55%" style="font-size: ${fontSize}; fill: #fff; text-anchor: middle; dominant-baseline:middle;font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei'; ">${content}</text>
        </svg>
    `;
    }


}
