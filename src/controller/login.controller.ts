import { Controller, Get, Req, Res } from '@nestjs/common';
import { loginService } from '../service';
import { Response, Request } from "express";
import { returnData } from '../model/login.model';

@Controller()
export class loginController {

  constructor (private readonly loginService: loginService) {}

  @Get('login')
  login(@Res() res: Response, @Req() req: Request) {
    this.loginService.loginUser(String(req.query.email), String(req.query.pass)).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }
}