import { sequelize } from "../../sequelize/config.sequelize";
import { DATE, DECIMAL, INTEGER, BOOLEAN } from "sequelize";

export const Cost = sequelize.define('cost', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  department_fk: {
    type: INTEGER,
    allowNull: true,
  },
  monthly_period_fk: {
    type: INTEGER,
    allowNull: true,
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  category_fk: {
    type: INTEGER,
    allowNull: true,
  },
  insertion_date: {
    type: DATE,
    allowNull: false,
  },
  payment_date: {
    type: DATE,
    allowNull: true,
  },
  submitted: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});