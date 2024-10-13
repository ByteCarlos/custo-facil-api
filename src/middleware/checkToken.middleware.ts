import { Injectable, NestMiddleware } from '@nestjs/common';
import { Req, Res, Next } from '@nestjs/common';
import { Response, Request, NextFunction } from "express";

@Injectable()
export class CheckToken implements NestMiddleware {
  use(@Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
    console.log("ok");
    next();
  }
}
