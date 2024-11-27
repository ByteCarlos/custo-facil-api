import { Module, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController, loginController, despesasController, relatoriosController, monthlyPeriodController, logController } from '../controller';
import { AppService, loginService, despesasService, relatoriosService, competenciasService, logService } from '../service';
import { CheckToken } from '../middleware/checkToken.middleware';
import { Log } from '../middleware/log.middleware';

@Module({
  controllers: [AppController, loginController, despesasController, relatoriosController, monthlyPeriodController, logController],
  providers: [AppService, loginService, despesasService, relatoriosService, competenciasService, logService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Log).forRoutes('*');

    consumer.apply(Log).forRoutes('*').apply(CheckToken).exclude(
      { path: 'login', method: RequestMethod.POST },
      { path: '/', method: RequestMethod.GET },
    ).forRoutes(
      { path: '*', method: RequestMethod.ALL },
    );
  }
}