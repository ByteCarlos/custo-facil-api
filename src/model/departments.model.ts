import { Cost, Departments } from "./db";

Departments.hasMany(Cost, { foreignKey: 'department_fk' });

export class Department {
    id?: number;
    name: string;
    description: string;
}