import { Module, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController, loginController, despesasController, relatoriosController, monthlyPeriodController, logController } from '../controller';
import { AppService, loginService, despesasService, relatoriosService, competenciasService, logService } from '../service';
import { CheckToken } from '../middleware/checkToken.middleware';

// @Module({
//   imports: [],
//   controllers: [AppController, loginController],
//   providers: [AppService, loginService],
// })
// export class AppModule {}

@Module({
  controllers: [AppController, loginController, despesasController, relatoriosController, monthlyPeriodController, logController],
  providers: [AppService, loginService, despesasService, relatoriosService, competenciasService, logService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(CheckToken).forRoutes({ path: 'despesas', method: RequestMethod.POST });
    consumer.apply(CheckToken).exclude(
      { path: 'login', method: RequestMethod.POST },
    ).forRoutes(
      { path: '*', method: RequestMethod.ALL },
    );
  }
}