import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { despesasService} from 'src/service';
import { Response, Request } from "express";
import { returnData } from 'src/model';

@Controller()
export class despesasController {

  constructor (private readonly loginService: despesasService) {}

  @Post('despesas')
  despesas(@Res() res: Response, @Req() req: Request) {
    this.loginService.despesas().then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }
}