import { Injectable } from '@nestjs/common';
import { Error, Model, Sequelize } from 'sequelize';
import {
    Cost,
    Costs,
    Category,
    MonthlyPeriod,
    Departments,
    returnData
} from '../model';

@Injectable()
export class relatoriosService {
    // @Author: Carlos
    // @Date: 06/11/2024
    // Histório 3: Busca os custos totais das categorias de cada departamento
    async getCustosPorDepartamento(): Promise<Object> {
        const dataUser = new returnData();
        dataUser.data = [];
        try {
            const result: any = await Cost.findAll({
                attributes: [
                    [Sequelize.col('department.name'), 'departamento'],
                    [Sequelize.col('category.name'), 'categoria'],
                    [Sequelize.fn('SUM', Sequelize.col('cost.value')), 'custoTotal']
                ],
                include: [
                    {
                        model: Departments,
                        attributes: [],
                        required: true
                    },
                    {
                        model: Category,
                        attributes: [],
                        required: true
                    },
                ],
                group: ['department.name', 'category.name'],
                raw: true,
            });

            // Formatação dos dados para organizar no charts
            const departamentosMap = new Map();

            result.forEach((item) => {
                const { departamento, categoria, custoTotal } = item;

                if (!departamentosMap.has(departamento)) {
                    departamentosMap.set(departamento, {
                        departamento,
                        custos: []
                    });
                }

                departamentosMap.get(departamento).custos.push({
                    categoria: categoria,
                    total: parseFloat(custoTotal) || 0,
                });
            });

            dataUser.status = 200;
            dataUser.data = Array.from(departamentosMap.values());

            return dataUser;
        } catch (err) {
            dataUser.status = 500;
            dataUser.message = "Erro ao calcular custos por departamento e categoria: " + err.message;
            return dataUser;
        }
    }
}

// colocar validador de tipo no metodo de inserção de dados (POST)