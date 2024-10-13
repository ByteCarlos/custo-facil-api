import { Departments } from "./db/departments.model";
import { Roles } from "./db/roles.model";
import { Users } from "./db/users.model";

Users.belongsTo(Departments, {
  foreignKey: 'department_fk',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

Users.belongsTo(Roles, {
  foreignKey: 'role_fk',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

class Department {
  id: number;
  name: String;
  description: String;
}

class Role {
  id: number;
  name: String;
}

export class User {
  id: number;
  name: String;
  email: String;
  password: String;
  department: Department;
  role: Role;
}

// planejo treansformar em um padrao para retorno de data para o front
export class returnData {
  status: number;
  data?: Object;
  message?: String;
}