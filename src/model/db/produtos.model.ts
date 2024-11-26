import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER, STRING } from "sequelize";

export const Produtos = sequelize.define('produtos', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: STRING(20),
    allowNull: false,
  },
  category_id: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
});