import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER, TEXT, STRING } from "sequelize";

export const Departments = sequelize.define('department', {
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
  description: {
    type: TEXT,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});