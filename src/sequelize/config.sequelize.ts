import { Sequelize } from "sequelize";
require('dotenv/config');

const DB: string = process.env.DATABASE;
const Schema: string = process.env.SCHEMA;
const User: string = process.env.USER_SEQU;
const Pass: string = process.env.PASS_SEQU;
const Host: string = process.env.HOST_SEQU;
const Port: number = Number(process.env.PORT_SEQU);

// usuario e senha devem ser postos em variaveis de ambiente (.env)
export const sequelize = new Sequelize(DB, User, Pass, {
  host: Host,
  port: Port,
  dialect: 'postgres',
  schema: Schema,
});