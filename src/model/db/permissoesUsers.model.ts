import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER } from "sequelize";

export const PermissoesUsers = sequelize.define('permissoesusers', {
  role_fk: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    // references: {
    //   model: "roles",
    //   key: "id",
    // },
  },
  permissao_fk: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    // references: {
    //   model: "permissoes",
    //   key: "id",
    // },
  }
}, {
  timestamps: false,
  freezeTableName: true,
});