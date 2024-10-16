import { Controller, Get, Post, Req, Res, Query, Delete, Patch } from '@nestjs/common';
import { despesasService } from '../service';
import { Response, Request } from "express";
import { returnData } from '../model';

@Controller('despesas')
export class despesasController {

  constructor (private readonly loginService: despesasService) {}

  @Post()
  insertDespesas(@Res() res: Response, @Req() req: Request) {
    this.loginService.insertDespesas(req.body).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get()
  getAllDespesas(@Res() res: Response, @Req() req: Request) {
    this.loginService.getAllDepesas().then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('departamento')
  getWhereDepartmentDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.loginService.getWhereDepartmentDespesa(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('despesa')
  getWhereDespesaId(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.loginService.getWhereDespesaId(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Delete()
  deleteDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.loginService.deleteDespesa(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.message);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Patch('update')
  updateDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.loginService.updateDespesa(id, req.body).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.message);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }
}