import { Plugin } from "siyuan";
import "./index.scss";
import { CalendarServer } from "./server";

export default class CalendarSVGPlugin extends Plugin {
    private server: CalendarServer = new CalendarServer(45678);

    onload() {

        // 启动服务器
        this.server.start();
    }

    onunload() {
        // 关闭服务器
        this.server.stop();
    }
}
