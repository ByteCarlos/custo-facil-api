import { Module } from '@nestjs/common';
import { AppController, loginController } from '../controller';
import { AppService, loginService } from '../service';

@Module({
  imports: [],
  controllers: [AppController, loginController],
  providers: [AppService, loginService],
})
export class AppModule {}
