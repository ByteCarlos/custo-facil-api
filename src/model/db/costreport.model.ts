import { sequelize } from "../../sequelize/config.sequelize";
import { DATE, DATEONLY, INTEGER, STRING } from "sequelize";

export const CostReport = sequelize.define('costreport', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  monthly_period_fk: {
    type: INTEGER,
    allowNull: true,
  },
  department_fk: {
    type: INTEGER,
    allowNull: true,
  },
  initial_date: {
    type: DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DATEONLY,
    allowNull: false,
  },
  generation_date: {
    type: DATE,
    allowNull: false,
  },
  format: {
    type: STRING(10),
    allowNull: true,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});