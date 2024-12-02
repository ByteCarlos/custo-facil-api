import { Controller, Get, Post, Req, Res, Query, Delete, Patch } from '@nestjs/common';
import { Response, Request } from "express";
import { returnData } from '../model';
import { relatoriosService } from 'src/service/relatorios.service';

@Controller('relatorios')
export class relatoriosController {

  // é possivel colocar duas services em um construtor ", loginService: loginService"
  constructor (private readonly relatoriosService: relatoriosService) {};

  @Get()
  getRelatorio(@Res() res: Response, @Req() _req: Request) {
    res.status(200).end();
  }

  @Get('custosPorDepartamento')
  getCustosPorDepartamento(@Res() res: Response, @Req() _req: Request) {
    this.relatoriosService.getCustosPorDepartamento().then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(400).send(err);
    });
  }

  @Get('tendenciaCustoDepartamento')
  getTendenciaCustoDepartamento(@Query('id') id: number, @Res() res: Response, @Req() _req: Request) {
    this.relatoriosService.getTendenciaCustoDepartamento(id).then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
        res.status(400).send(err);
    })
  }
}