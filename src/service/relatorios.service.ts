import { Injectable } from '@nestjs/common';
import { Error, Model, Op, Sequelize } from 'sequelize';
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

    // @Author: Carlos
    // @Date: 06/11/2024
    // Histório 5: Busca todos os custos de um departamento numa projeção de seis meses
    async getTendenciaCustoDepartamento(departamentId: number): Promise<returnData> {
        const dataUser = new returnData();
        dataUser.data = [];

        try {
            // Define a data limite para os últimos seis meses
            const seisMesesAtras = new Date();
            seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);

            const result: any = await Cost.findAll({
                attributes: [
                    [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')), 'mes'], // Agrupa por mes
                    [Sequelize.col('category.name'), 'categoria'],
                    [Sequelize.fn('SUM', Sequelize.col('cost.value')), 'custoTotal'] // Soma dos custos
                ],
                where: {
                    department_fk: departamentId, // Filtro por departamento
                    insertion_date: {
                        [Op.gte]: seisMesesAtras, // Restringe para apresentar somente os últimos 6 meses
                    },
                },
                include: [
                    {
                        model: Category,
                        attributes: [],
                        required: true,
                    },
                ],
                group: [
                    Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')),
                    'category.name'
                ],
                order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')), 'ASC']],
                raw: true,
            });


            // Formatação dos dados
            const tendencia: { [key: string]: { categoria: string, custoTotal: number }[] } = {};

            result.forEach((item) => {
                const { mes, categoria, custoTotal } = item;
                const mesString = new Date(mes).toISOString().slice(0, 7); // Formato YYYY-MM

                if (!tendencia[mesString]) {
                    tendencia[mesString] = [];
                }

                tendencia[mesString].push({
                    categoria,
                    custoTotal: parseFloat(custoTotal) || 0,
                });
            });

            dataUser.data = Object.entries(tendencia).map(([mes, custos]) => ({
                mes,
                custos,
            }));

            dataUser.status = 200;
            return dataUser;
        } catch (err) {
            dataUser.status = 500;
            dataUser.message = "Erro ao calcular tendência de custo do departamento: " + err.message;
            return dataUser;
        }
    }
}