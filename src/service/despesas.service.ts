import { Injectable } from '@nestjs/common';
import { returnData } from 'src/model';

@Injectable()
export class despesasService {
  async despesas(): Promise<Object> {
    const dataUser = new returnData();
    dataUser.status = 200;
    dataUser.message = "passou no middleware com padrão de exclusão de rota";
    dataUser.data = {
      msg: "dados que serao retornado",
    };

    return {...dataUser};
  }
}
