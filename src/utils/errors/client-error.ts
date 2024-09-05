import AppError from './app-error'
class ClientError extends AppError{
    constructor(name:string, message:string, explanation:string[], statusCode:number){
        super(name, message, explanation, statusCode);
    }
}

export default ClientError