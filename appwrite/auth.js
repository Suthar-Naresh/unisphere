import { Account, Client, ID } from 'appwrite';
import conf from '../conf/conf';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.endpoint)
        .setProject(conf.project_id);

        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) return this.login({email, password});
            return userAccount;
        } catch (error) {
            console.log("AuthService::createAccount()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log("AuthService::login()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async logout(){
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("AuthService::logout()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService::getCurrentUser()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }
}

const authService = new AuthService();

export default authService;