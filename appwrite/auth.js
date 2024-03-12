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
            throw new Error("AuthService::createAccount()::error", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log(error);
            throw new Error("AuthService::login()::error", error);
        }
    }

    async logout(){
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            throw new Error("AuthService::logout()::error", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw new Error("AuthService::getCurrentUser()::error", error);
        }
    }
}

const authService = new AuthService();

export default authService;