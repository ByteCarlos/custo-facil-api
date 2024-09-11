import { Sequelize } from "sequelize";

// usuario e senha devem ser postos em variaveis de ambiente (.env)
export const sequelize = new Sequelize('sistema_custos', 'usuario', 'senha', {
  host: 'localhost',
  port: 3306,
  dialect: 'postgres'
});