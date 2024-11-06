import { Module, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController, loginController, despesasController, monthlyPeriodController } from '../controller';
import { AppService, loginService, despesasService, competenciasService } from '../service';
import { CheckToken } from '../middleware/checkToken.middleware';

// @Module({
//   imports: [],
//   controllers: [AppController, loginController],
//   providers: [AppService, loginService],
// })
// export class AppModule {}

@Module({
  controllers: [AppController, loginController, despesasController, monthlyPeriodController],
  providers: [AppService, loginService, despesasService, competenciasService],
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