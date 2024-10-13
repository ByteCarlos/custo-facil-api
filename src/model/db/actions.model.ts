import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, STRING } from "sequelize";

export const Action = sequelize.define('actions', {
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
}, {
  timestamps: false,
});