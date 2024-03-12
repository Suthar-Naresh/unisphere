import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf/conf';

export class DBService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.endpoint)
            .setProject(conf.project_id);

        this.databases = new Databases(this.client);
    }

    async createStudent({ name, email, university }) {
        try {
            return await this.databases.createDocument(conf.db_id, conf.student_collection_id, ID.unique(),
                { name, email, university }
            );
        } catch (error) {
            throw new Error("DBService::createStudent()::error", error);
        }
    }

    async updatePost(docID, { title, content, image, isPublished }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, docID,
                { title, content, image, isPublished }
            );
        } catch (error) {
            throw new Error("DBService::updatePost()::error", error);
        }
    }

    async deletePost(docID) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, docID);
        } catch (error) {
            throw new Error("DBService::deletePost()::error", error);
        }
    }

    async getPost(docID) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, docID);
        } catch (error) {
            throw new Error("DBService::getPost()::error", error);
        }
    }

    async getUniversities() {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.university_collection_id);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::getUniversities()::error", error);
        }
    }

    async allEvents() {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.event_collection_id);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::allEvents()::error", error);
        }
    }
}

const dbService = new DBService();

export default dbService;