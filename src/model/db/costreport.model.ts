import { sequelize } from "../../sequelize/config.sequelize";
import { DATE, DATEONLY, INTEGER, STRING } from "sequelize";
import { Departments, MonthlyPeriod } from "./";

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

// // CostReport.belongsTo(MonthlyPeriod, { 
// //   foreignKey: 'monthly_period_fk' 
// // });

// CostReport.belongsTo(Departments, { 
//   foreignKey: 'department_fk' 
// });

// // MonthlyPeriod.hasMany(CostReport, { 
// //   foreignKey: 'monthly_period_fk' 
// // });

// Departments.hasMany(CostReport, { 
//   foreignKey: 'department_fk' 
// });