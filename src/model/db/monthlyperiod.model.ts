import { sequelize } from "../../sequelize/config.sequelize";
import { DATEONLY, INTEGER, BOOLEAN } from "sequelize";

export const MonthlyPeriod = sequelize.define('monthlyperiod', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  month_year: {
    type: DATEONLY,
    allowNull: false,
  },
  open_date: {
    type: DATEONLY,
    allowNull: true,
  },
  close_date: {
    type: DATEONLY,
    allowNull: true,
  },
  open: {
    type: BOOLEAN,
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});