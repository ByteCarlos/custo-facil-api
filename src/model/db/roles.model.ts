import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, ENUM, STRING, TEXT } from "sequelize";

export const Roles = sequelize.define('roles', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: TEXT,
    allowNull: false,
  }
}, {
  timestamps: false,
});