import { sequelize } from "../../sequelize/config.sequelize";
import { DATE, INTEGER } from "sequelize";
import { Users, Action } from './';

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

// Logs.belongsTo(Users, { 
//   foreignKey: 'user_fk' 
// });

// Logs.belongsTo(Action, { 
//   foreignKey: 'action_fk' 
// });

// Users.hasMany(Logs, { 
//   foreignKey: 'user_fk' 
// });

// Action.hasMany(Logs, { 
//   foreignKey: 'action_fk' 
// });