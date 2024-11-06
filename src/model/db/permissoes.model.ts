import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER, STRING } from "sequelize";

export const Permissoes = sequelize.define('permissoes', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});