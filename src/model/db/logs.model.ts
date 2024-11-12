import { sequelize } from "../../sequelize/config.sequelize";
import { DATE, INTEGER } from "sequelize";

export const Logs = sequelize.define('logs', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_fk: {
    type: INTEGER,
    allowNull: true,
  },
  log_timestamp: {
    type: DATE,
    allowNull: false,
  },
  action_fk: {
    type: INTEGER,
    allowNull: true,
  }
}, {
  timestamps: false,
});