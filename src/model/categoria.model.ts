import { Category, Cost } from "./db";

Category.hasMany(Cost, { foreignKey: 'department_fk' });

export class categoria {
  id: number;
  name: String;
}