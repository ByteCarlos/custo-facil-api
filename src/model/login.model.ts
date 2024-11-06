import { Departments, Permissoes, PermissoesUsers, Roles, Users } from './db';

// departmente
Departments.hasMany(Users, {
  foreignKey: 'department_fk',
});

Users.belongsTo(Departments, {
  foreignKey: 'department_fk',
});

// Roles
Roles.hasMany(Users, {
  foreignKey: 'role_fk',
});

Users.belongsTo(Roles, {
  foreignKey: 'role_fk',
});
// Roles

// a associação da tabela permissões esta falhando
// Permissoes
// Users.hasMany(Roles, {
//   foreignKey: 'role_fk',
// });

PermissoesUsers.belongsTo(Roles, {
  foreignKey: 'role_fk',
});

Roles.hasMany(PermissoesUsers, {
  foreignKey: 'role_fk',
});

Permissoes.hasMany(PermissoesUsers, {
  foreignKey: 'permissao_fk',
});

PermissoesUsers.belongsTo(Permissoes, {
  foreignKey: 'permissao_fk',
});
// Permissoes

/*
No contexto de bancos de dados, has_many e belongs_to são termos que indicam diferentes tipos de associações entre modelos:

has_many: Indica uma associação um-para-muitos (1:N). Por exemplo, a associação "Article hasMany Comments" permite que comentários sejam associados a artigos quando o artigo é carregado.

belongs_to: Indica um relacionamento um-para-um (1:1). 
*/

class Department {
  id: number;
  name: String;
  description: String;
}

class PermissoesUser {
  role_fk: number;
  permissao_fk: number;
}

class Role {
  id: number;
  name: String;
  permissoesusers: PermissoesUser;
}

export class User {
  id: number;
  name: String;
  email: String;
  password: String;
  department: Department;
  role: Role;
}