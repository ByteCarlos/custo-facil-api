import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, STRING } from "sequelize";

export const Category = sequelize.define('category', {
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
  timestamps: false,
  freezeTableName: true,
});