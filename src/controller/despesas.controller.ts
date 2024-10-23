import { Controller, Get, Post, Req, Res, Query, Delete, Patch } from '@nestjs/common';
import { despesasService } from '../service';
import { Response, Request } from "express";
import { returnData } from '../model';

@Controller('despesas')
export class despesasController {

  // é possivel colocar duas services em um construtor ", loginService: loginService"
  constructor (private readonly despesasService: despesasService) {};

  @Post()
  insertDespesas(@Res() res: Response, @Req() req: Request) {
    this.despesasService.insertDespesas(req.body).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get()
  getAllDespesas(@Query('limit') limit: number, @Query('offset') offset: number, @Res() res: Response, @Req() req: Request) {
    this.despesasService.getAllDepesas(limit, offset).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('departamento')
  getWhereDepartmentDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.despesasService.getWhereDepartmentDespesa(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('despesa')
  getWhereDespesaId(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.despesasService.getWhereDespesaId(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Delete()
  deleteDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.despesasService.deleteDespesa(id).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.message);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Patch('update')
  updateDespesa(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.despesasService.updateDespesa(id, req.body).then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.message);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }

  @Get('categorias')
  getCategory(@Res() res: Response, @Req() req: Request) {
    this.despesasService.getCategory().then((result: returnData) => {
      if (result.status === 406 || result.status === 503) throw result;
      res.status(result.status).send(result.data);
    }).catch((err: returnData) => {
      res.status(err.status).send(err.message);
    });
  }
}