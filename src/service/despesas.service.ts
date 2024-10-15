import { Injectable } from '@nestjs/common';
import { Error } from 'sequelize';
import { Cost, Costs, Category, MonthlyPeriod, Departments, returnData } from '../model';

@Injectable()
export class despesasService {
  async despesas(data: Body & Costs): Promise<Object> {
    // console.log(data);

    const insertCost = new Costs();

    // inserir ternario caso nao tenha valor
    insertCost.department_fk = data.department_fk;
    insertCost.monthly_period_fk = data.monthly_period_fk;
    insertCost.value = data.value;
    insertCost.category_fk = data.category_fk;
    insertCost.insertion_date = data.insertion_date;
    insertCost.payment_date = data.payment_date;
    insertCost.status = data.status;

    const dataUser = new returnData();

    await Cost.create({
      ...insertCost,

    }, {
      include: [Category, MonthlyPeriod, Departments],
    }).then((result) => {
      // console.log(result);

      dataUser.status = 201;
      dataUser.data = {
        msg: "Dados inseridos",
      };

    }).catch((err: Error) => {
      // console.log(err.message);
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao inserir dados, revise os tipos\n" + err.message;
      } else {
        // por hora não irei definir os tipos para retornar o status e o codigo de erro corretos
        dataUser.status = 503;
        dataUser.message = "Erro ao inserir dados, contate o ADM assim que possivel\n" + err.message;
      }
    });

    return { ...dataUser };
  }
}
