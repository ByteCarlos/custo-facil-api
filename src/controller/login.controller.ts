import { Controller, Get, Req, Res } from '@nestjs/common';
import { returnData, loginService } from 'src/service';
import { Response, Request } from "express";

@Controller()
export class loginController {

  constructor (private readonly loginService: loginService) {}

  // penso em futuramente trocar e colocar tudo que for relacionado ao usuario em apenas uma
  // controller e uma service
  @Get('login')
  login(@Res() res: Response, @Req() req: Request) {
    this.loginService.loginUser(String(req.query.email), String(req.query.pass)).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      // console.log(result);
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      // console.log(err);
      res.status(err.status).send(err.message);
    });
  }
}