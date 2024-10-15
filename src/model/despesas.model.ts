import { Cost, Category, MonthlyPeriod, Departments } from './db';

// category
Category.belongsTo(Cost, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

Cost.hasMany(Category, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});
// category

// department
Departments.belongsTo(Cost, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION", 
});

Cost.hasMany(Departments, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION", 
});
// department

// periodo mensal
MonthlyPeriod.belongsTo(Cost, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION", 
});

Cost.belongsTo(MonthlyPeriod, {
  foreignKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION", 
});
// periodo mensal

class Categorys {
  id: number;
  name: String;
}

class Department {
  id: number;
  name: String;
  Description: String;
}

class MonthlyPeriods {
  id: number;
  month_year: Date;
  open_date: Date;
  close_date: Date;
  status: String;
}

export class Costs {
  id?: number;
  department_fk: number;
  monthly_period_fk: number;
  value: number;
  category_fk: number;
  insertion_date: Date;
  payment_date: Date;
  status: String;
  category: Categorys;
  department: Department;
  monthly_period: MonthlyPeriods;
}