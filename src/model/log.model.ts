import { Action, Logs, Users } from './db';

Logs.belongsTo(Users, {
    foreignKey: 'user_fk'
});

Logs.belongsTo(Action, {
    foreignKey: 'action_fk'
});

Users.hasMany(Logs, {
    foreignKey: 'user_fk'
});

Action.hasMany(Logs, {
    foreignKey: 'action_fk'
});

export class Log {
    id: number;
    user_fk: number;
    log_timestamp: Date;
    action_fk: number;
}