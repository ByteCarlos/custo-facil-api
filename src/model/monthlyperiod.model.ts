import { Departments, MonthlyPeriod } from './db';

MonthlyPeriod.belongsTo(Departments, { 
  foreignKey: 'department_fk' 
});

Departments.hasMany(MonthlyPeriod, { 
  foreignKey: 'department_fk' 
});

class Department {
  id: number;
  name: String;
  Description: String;
}

export class MonthlyPeriods {
  id: number;
  month_year: Date;
  open_date: Date;
  close_date: Date;
  status: String;
}