import { Cost, Category, MonthlyPeriod, Departments } from './db';

Cost.belongsTo(Departments, { 
  foreignKey: 'department_fk' 
});

Cost.belongsTo(MonthlyPeriod, { 
  foreignKey: 'monthly_period_fk'
});

Cost.belongsTo(Category, { 
  foreignKey: 'category_fk' 
});

Departments.hasMany(Cost, { 
  foreignKey: 'department_fk' 
});

MonthlyPeriod.hasMany(Cost, { 
  foreignKey: 'monthly_period_fk' 
});

Category.hasMany(Cost, { 
  foreignKey: 'category_fk' 
});

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
  open: Boolean;
}

export class Costs {
  id?: number;
  department_fk: number;
  monthly_period_fk: number;
  value: number;
  category_fk: number;
  insertion_date: Date;
  payment_date: Date;
  submitted: Boolean;
  category: Categorys;
  department: Department;
  monthly_period: MonthlyPeriods;
}