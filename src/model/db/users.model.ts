import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, TEXT } from "sequelize";

export const Users = sequelize.define('users', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: TEXT,
    allowNull: false,
  },
  email: {
    type: TEXT,
    allowNull: false,
  },
  password: {
    type: TEXT,
    allowNull: false,
  },
  role_fk: {
    type: INTEGER,
    allowNull: true,
  },
  department_fk: {
    type: INTEGER,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});