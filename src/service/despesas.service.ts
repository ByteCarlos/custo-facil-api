import { Injectable } from '@nestjs/common';
import { Error, Model } from 'sequelize';
import { Cost, Costs, Category, MonthlyPeriod, Departments, returnData } from '../model';

@Injectable()
export class despesasService {
  async insertDespesas(data: Body & Costs): Promise<Object> {
    const insertCost = new Costs();

    // inserir ternario caso nao tenha valor - ainda julgando necessario
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
      include: [Category, MonthlyPeriod, Departments],
    }).then((result) => {

      dataUser.status = 201;
      // aqui não é necessario dizer que é um tipo objeto já que esta sendo diretamente atribuido
      dataUser.data = {
        msg: "Dados inseridos",
      };

    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao inserir dados, revise os tipos\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro ao inserir dados, contate o ADM assim que possivel\n" + err.message;
      }
    });

    return { ...dataUser };
  };

  async getAllDepesas(): Promise<Object> {
    const dataUser = new returnData();
    //  aqui é necessario definir que é um array já que na classe returnData, data pode atribuir dois tipos. (quase uma super posição kkkk)
    dataUser.data = [];

    await Cost.findAll({
      include: [Category, MonthlyPeriod, Departments],
    }).then((result: Model<Costs>[]) => {
      dataUser.status = 302;
      result.forEach((dataCost: Model<Costs>) => {
        (dataUser.data as Array<Object>).push(dataCost.dataValues);
      });

    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao requisitar dados\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro, contate o ADM\n" + err.message;
      }
    });

    return { ...dataUser };
  }

  async getWhereDepartmentDespesa(departmentID: number): Promise<Object> {
    const dataUser = new returnData();
    dataUser.data = [];

    await Cost.findAll({
      where: {
        department_fk: departmentID,
      },
      include: [Category, MonthlyPeriod, Departments],
    }).then((result: Model<Costs>[]) => {
      dataUser.status = 302;
      result.forEach((dataCost: Model<Costs>) => {
        (dataUser.data as Array<Object>).push(dataCost.dataValues);
      });

    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao requisitar dados\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro, contate o ADM\n" + err.message;
      }
    });

    return {...dataUser};
  }

  async getWhereDespesaId(despesaID: number): Promise<Object> {
    const dataUser = new returnData();

    await Cost.findByPk(despesaID, {
      include: [Category, MonthlyPeriod, Departments]
    }).then((result: Model<Costs>) => {
      dataUser.status = 302;
      dataUser.data = {
        ...result.dataValues
      };

    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao requisitar dados\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro, contate o ADM\n" + err.message;
      }
    });

    return {...dataUser};
  }

  async deleteDespesa(id: number): Promise<Object> {
    const dataUser = new returnData();

    await Cost.destroy({where: {id: id}}).then((result: number) => {
      if (result !== 0) {
        dataUser.status = 200;
        dataUser.message = "Despesa deletada com sucesso";
      } else {
        dataUser.status = 404;
        dataUser.message = "Despesa não encontrada";
      }

    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao deletar dados\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro, contate o ADM\n" + err.message;
      }
    });

    return {...dataUser};
  }

  async updateDespesa(id: number, updateData: Object): Promise<Object>  {
    const dataUser = new returnData();

    await Cost.update({
      ...updateData,
    }, {
      where: {id: id},
    }).then((result: Array<number>) => {
      console.log(result[0] !== 0);

      if (result[0] === 1) {
        dataUser.status = 200;
        dataUser.message = "Despesa alterada"
      } else {
        dataUser.status = 404;
        dataUser.message = "Despesa não encontrada ou não existe";
      }
      
      
    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 406;
        dataUser.message = "Erro ao deletar dados\n" + err.message;
      } else {
        dataUser.status = 503;
        dataUser.message = "Erro, contate o ADM\n" + err.message;
      }
    });

    return {...dataUser};
  }
}

// colocar validador de tipo no metodo de inserção de dados (POST)