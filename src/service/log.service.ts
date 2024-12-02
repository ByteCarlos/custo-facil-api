import { Injectable } from '@nestjs/common';
import {
    returnData,
    Logs,
    Users,
    Action
} from '../model';

@Injectable()
export class logService {
    async getLogs(): Promise<Object> {
        const dataLog = new returnData();
        dataLog.data = [];

        try {
            const logs = await Logs.findAll({
                include: [
                    {
                        model: Users,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Action,
                        attributes: ['id', 'name']
                    }
                ],
                order: [['log_timestamp', 'DESC']],
                limit: 10,
                offset: 0,
            });

            dataLog.status = 200;
            dataLog.data = logs;

            return dataLog;
        } catch (error) {
            dataLog.status = 500;
            dataLog.message = "Erro ao buscar os logs da aplicação: " + error.message;
            return dataLog;
        }
    }
}