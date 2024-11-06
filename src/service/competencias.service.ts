import { Injectable } from '@nestjs/common';
import { Error, Model } from 'sequelize';
import { MonthlyPeriod, MonthlyPeriods, returnData } from '../model';

@Injectable()
export class competenciasService {
  async insertMonthlyPeriod(data: Array<any>): Promise<Object> {
    const dataUser = new returnData();

    await MonthlyPeriod.bulkCreate(data)
      .then((result) => {
        dataUser.status = 201;
        dataUser.data = {
          msg: "Dados inseridos",
        };
      })
      .catch((err: Error) => {
        if (err.name) {
          dataUser.status = 406;
          dataUser.message = "Erro ao inserir dados, revise os tipos\n" + err.message;
        } else {
          dataUser.status = 503;
          dataUser.message = "Erro ao inserir dados, contate o ADM assim que possível\n" + err.message;
        }
      });

    return { ...dataUser };
  }

  async getAllMonthlyPeriods(limit: number, offset: number): Promise<Object> {
    const dataUser = new returnData();
    dataUser.data = [];

    await MonthlyPeriod.findAll({
      order: [['month_id', 'DESC']],
      limit: limit,
      offset: offset,
    })
      .then((result: Model<MonthlyPeriods>[]) => {
        dataUser.status = 200;
        result.forEach((dataPeriod: Model<MonthlyPeriods>) => {
          (dataUser.data as Array<Object>).push(dataPeriod.dataValues);
        });
      })
      .catch((err: Error) => {
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
  
  async getMonthlyPeriodById(monthId: number): Promise<Object> {
    const dataUser = new returnData();

    await MonthlyPeriod.findByPk(monthId)
      .then((result: Model<MonthlyPeriods>) => {
        dataUser.status = 200;
        dataUser.data = {
          ...result.dataValues,
        };
      })
      .catch((err: Error) => {
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

  async deleteMonthlyPeriod(id: number): Promise<Object> {
    const dataUser = new returnData();

    await MonthlyPeriod.destroy({ where: { id: id } })
      .then((result: number) => {
        if (result !== 0) {
          dataUser.status = 200;
          dataUser.message = "Período mensal deletado com sucesso";
        } else {
          dataUser.status = 404;
          dataUser.message = "Período mensal não encontrado";
        }
      })
      .catch((err: Error) => {
        if (err.name) {
          dataUser.status = 406;
          dataUser.message = "Erro ao deletar dados\n" + err.message;
        } else {
          dataUser.status = 503;
          dataUser.message = "Erro, contate o ADM\n" + err.message;
        }
      });

    return { ...dataUser };
  }

  async updateMonthlyPeriod(id: number, updateData: Object): Promise<Object> {
    const dataUser = new returnData();

    await MonthlyPeriod.update({ ...updateData }, { where: { id: id } })
      .then((result: Array<number>) => {
        if (result[0] === 1) {
          dataUser.status = 200;
          dataUser.message = "Período mensal alterado";
        } else {
          dataUser.status = 404;
          dataUser.message = "Período mensal não encontrado ou não existe";
        }
      })
      .catch((err: Error) => {
        if (err.name) {
          dataUser.status = 406;
          dataUser.message = "Erro ao atualizar dados\n" + err.message;
        } else {
          dataUser.status = 503;
          dataUser.message = "Erro, contate o ADM\n" + err.message;
        }
      });

    return { ...dataUser };
  }
}
