import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER, DECIMAL } from "sequelize";

export const CostReportFormat = sequelize.define('costreport', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  format: {
    type: DECIMAL(10),
    allowNull: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});