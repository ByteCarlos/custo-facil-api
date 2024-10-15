import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { despesasService } from '../service';
import { Response, Request } from "express";
import { returnData } from '../model';

@Controller()
export class despesasController {

  constructor (private readonly loginService: despesasService) {}

  @Post('despesas')
  insertDespesas(@Res() res: Response, @Req() req: Request) {
    this.loginService.insertDespesas(req.body).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('despesas')
  getAllDespesas(@Res() res: Response, @Req() req: Request) {
    this.loginService.getAllDepesas().then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }
}