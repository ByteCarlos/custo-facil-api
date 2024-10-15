import { sequelize } from "../../sequelize/config.sequelize";
import { DATEONLY, INTEGER, STRING } from "sequelize";

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
  status: {
    type: STRING(10),
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});