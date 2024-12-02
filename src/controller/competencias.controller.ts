import { Controller, Get, Post, Req, Res, Query, Delete, Patch } from '@nestjs/common';
import { competenciasService } from '../service';
import { Response, Request } from "express";
import { returnData } from '../model';

@Controller('monthly-period')
export class monthlyPeriodController {

  constructor(private readonly monthlyPeriodService: competenciasService) {}

  @Post()
  insertMonthlyPeriod(@Res() res: Response, @Req() req: Request) {
    this.monthlyPeriodService.insertMonthlyPeriod(req.body)
      .then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.data);
      })
      .catch((err: returnData) => {
        res.status(err.status).send(err.message);
      });
  }

  @Get()
  getAllMonthlyPeriods(@Query('limit') limit: number, @Query('offset') offset: number, @Res() res: Response, @Req() req: Request) {
    if ((limit === undefined) || (offset === undefined)) {
      res.status(200).end();
    } else {
      this.monthlyPeriodService.getAllMonthlyPeriods(limit, offset).then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.data);
      }).catch((err: returnData) => {
        res.status(err.status).send(err.message);
      });
    }
  }

  @Get('monthly-period')
  getMonthlyPeriodById(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.monthlyPeriodService.getMonthlyPeriodById(id)
      .then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.data);
      })
      .catch((err: returnData) => {
        res.status(err.status).send(err.message);
      });
  }

  @Delete()
  deleteMonthlyPeriod(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.monthlyPeriodService.deleteMonthlyPeriod(id)
      .then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.message);
      })
      .catch((err: returnData) => {
        res.status(err.status).send(err.message);
      });
  }

  @Patch('update')
  updateMonthlyPeriod(@Query('id') id: number, @Res() res: Response, @Req() req: Request) {
    this.monthlyPeriodService.updateMonthlyPeriod(id, req.body)
      .then((result: returnData) => {
        if (result.status === 406 || result.status === 503) throw result;
        res.status(result.status).send(result.message);
      })
      .catch((err: returnData) => {
        res.status(err.status).send(err.message);
      });
  }
}
