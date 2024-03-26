import { Client, Functions } from 'appwrite';
import conf from '../conf/conf';

export class FunctionService {
    client = new Client();
    functions;

    constructor() {
        this.client
            .setEndpoint(conf.endpoint)
            .setProject(conf.project_id);

        this.functions = new Functions(this.client)
    }

    async createPaymentIntent(amount) {
        const data = JSON.stringify({ 'amount': Math.round(amount)*100 });
        try {
            const execution = await this.functions.createExecution( conf.function_id, data, false, '/', 'POST');
            console.log(execution);
            console.log(execution.responseBody)
            return execution.responseBody;
        } catch (error) {
            console.log("FunctionService::createPaymentIntent()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }

    }

    async demoFunk(amount) {
        const data = JSON.stringify({ 'amount': Math.round(amount)*100 });
        try {
            const execution = await this.functions.createExecution('66029a9f6bc86576734a', data, false, '/', 'POST');
            console.log(execution);
            return execution.responseBody;
        } catch (error) {
            console.log("FunctionService::demoFunk()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }

    }

}

const functionService = new FunctionService();

export default functionService 