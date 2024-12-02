import { Injectable } from '@nestjs/common';
import { Error, Model, Op, Sequelize } from 'sequelize';
import {
    Cost,
    Costs,
    Category,
    MonthlyPeriod,
    Departments,
    returnData,
    Produtos
} from '../model';
import { sequelize } from "../sequelize/config.sequelize";

@Injectable()
export class relatoriosService {
    // @Author: Carlos
    // @Date: 06/11/2024
    // Histório 3: Busca os custos totais das categorias de cada departamento
    async getCustosPorDepartamento(): Promise<Object> {
        const dataUser = new returnData();
        dataUser.data = [];
        try {
            // const result: any = await Cost.findAll({
            //     attributes: [
            //         [Sequelize.col('department.name'), 'departamento'],
            //         [Sequelize.col('produtos.nome'), 'produtos'],
            //         [Sequelize.fn('SUM', Sequelize.col('cost.value')), 'custoTotal']
            //     ],
            //     include: [
            //         {
            //             model: Departments,
            //             attributes: [],
            //             required: true,
            //         },
            //         // {
            //         //     model: Category,
            //         //     attributes: [],
            //         //     required: true,
            //         // },
            //         {
            //             model: Produtos,
            //             attributes: [],
            //             required: true,
            //             as: "produtos",
            //         },
            //     ],
            //     group: ['department.name', 'produtos.nome'],
            //     raw: true,
            // });
            const result: any = await sequelize.query(`
                SELECT 
	                "department"."name" AS "departamento", 
	                "produtos"."nome" AS "produtos", 
	                SUM("cost"."value") AS "custoTotal" 
                FROM "custos"."cost" AS "cost" 
                INNER JOIN "custos"."department" AS "department" ON "cost"."department_fk" = "department"."id" 
                INNER JOIN "custos"."produtos" AS "produtos" ON "cost"."produtos_fk" = "produtos"."id" 
                GROUP BY "department"."name", "produtos"."nome";
            `, {
                raw: true,
            });

            // console.log(result[0]);

            // Formatação dos dados para organizar no charts
            const departamentosMap = new Map();

            result[0].forEach((item) => {
                const { departamento, produtos, custoTotal } = item;

                if (!departamentosMap.has(departamento)) {
                    departamentosMap.set(departamento, {
                        departamento,
                        custos: []
                    });
                }

                departamentosMap.get(departamento).custos.push({
                    produtos: produtos,
                    total: parseFloat(custoTotal) || 0,
                });
            });

            dataUser.status = 200;
            dataUser.data = Array.from(departamentosMap.values());

            return dataUser;
        } catch (err) {
            // console.log(err);
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

            // const result: any = await Cost.findAll({
            //     attributes: [
            //         [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')), 'mes'], // Agrupa por mes
            //         [Sequelize.col('produtos.nome'), 'produtos'],
            //         [Sequelize.fn('SUM', Sequelize.col('cost.value')), 'custoTotal'] // Soma dos custos
            //     ],
            //     where: {
            //         produtos_fk: departamentId, // Filtro por departamento
            //         insertion_date: {
            //             [Op.gte]: seisMesesAtras, // Restringe para apresentar somente os últimos 6 meses
            //         },
            //     },
            //     include: [
            //         // {
            //         //     model: Category,
            //         //     attributes: [],
            //         //     required: true,
            //         // },
            //         {
            //             model: Produtos,
            //             attributes: [],
            //             required: true,
            //         },
            //     ],
            //     group: [
            //         Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')),
            //         'produtos.nome'
            //     ],
            //     order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('insertion_date')), 'ASC']],
            //     raw: true,
            // });
            // console.log(seisMesesAtras.toISOString());
            const result: any = await sequelize.query(`
                SELECT 
	                DATE_TRUNC('month', "insertion_date") AS "mes", 
	                "produtos"."nome" AS "produtos", 
	                SUM("cost"."value") AS "custoTotal" 
                FROM "custos"."cost" AS "cost" 
                INNER JOIN "custos"."produtos" AS "produtos" ON "cost"."produtos_fk" = "produtos"."id" 
                WHERE "cost"."department_fk" = '${departamentId}' AND "cost"."insertion_date" >= '${seisMesesAtras.toISOString()}' 
                GROUP BY DATE_TRUNC('month', "insertion_date"), "produtos"."nome" 
                ORDER BY DATE_TRUNC('month', "insertion_date") ASC;
            `, {
                raw: true,
            });


            // Formatação dos dados
            const tendencia: { [key: string]: { produtos: string, custoTotal: number }[] } = {};

            result[0].forEach((item) => {
                const { mes, produtos, custoTotal } = item;
                const mesString = new Date(mes).toISOString().slice(0, 7); // Formato YYYY-MM

                if (!tendencia[mesString]) {
                    tendencia[mesString] = [];
                }

                tendencia[mesString].push({
                    produtos,
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
            // console.log(err);
            dataUser.status = 500;
            dataUser.message = "Erro ao calcular tendência de custo do departamento: " + err.message;
            return dataUser;
        }
    }
}
