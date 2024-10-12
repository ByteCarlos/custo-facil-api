import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, ENUM, STRING, TEXT, FLOAT, DATEONLY } from "sequelize";

export const custos = sequelize.define("custs", {
  custs_id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  departtment_id: {
    type: INTEGER,
    allowNull: true,
  },
  user_id: {
    type: INTEGER,
    allowNull: true,
  },
  month_id: {
    type: INTEGER,
    allowNull: true,
  },
  custs_type: {
    type: TEXT,
    allowNull: true,
  },
  value: {
    type: FLOAT,
    allowNull: true,
  },
  insertion_date: {
    type: DATEONLY,
    allowNull: false,
  }
}, {
  timestamps: false,
});