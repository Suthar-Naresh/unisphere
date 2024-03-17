import { Teams, Client } from 'appwrite';
import conf from '../conf/conf';

export class TeamService{
    client = new Client();
    teams;

    constructor(){
        this.client
        .setEndpoint(conf.endpoint)
        .setProject(conf.project_id);
        
        this.teams = new Teams(this.client);
    }

    async getTeamsOfUser(){
        try {
            return await this.teams.list();
        } catch (error) {
            console.log("TeamService::getTeamsOfUser()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }
    
}

const teamService = new TeamService();

export default teamService;