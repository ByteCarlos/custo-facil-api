import { Controller, Get, Post, Req, Res, Query, Delete, Patch } from '@nestjs/common';
import { Response, Request } from "express";
import { returnData } from '../model';
import { logService } from 'src/service/log.service';

@Controller('logs')
export class logController {

  constructor (private readonly logService: logService) {};

  @Get()
  getCustosPorDepartamento(@Res() res: Response, @Req() _req: Request) {
    this.logService.getLogs().then((result: returnData) => {
      if (result.status === 406 || result.status === 500) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(400).send(err);
    });
  }
}