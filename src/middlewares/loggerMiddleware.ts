import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()

export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} estas ejecutando un método ${req.method} en la ruta ${req.url}`);
        next();
    }
}
    export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
        const actualDate = new Date();
        const date = actualDate.toLocaleDateString();
        const time = actualDate.toLocaleTimeString();
        next()
        return `${req.method} ${req.url} ${date} ${time}`;
    }

