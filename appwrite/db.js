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
            return await this.databases.listDocuments(conf.db_id, conf.event_collection_id, [Query.orderDesc("$createdAt")]);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::allEvents()::error", error);
        }
    }

    async registerStudentInEvent(studentId, eventId) {
        try {
            return await this.databases.createDocument(conf.db_id, conf.event_attend_collection_id, ID.unique(), { student_id: studentId, event_id: eventId });
        } catch (error) {
            console.log(error);
            throw new Error("DBService::registerStudentInEvent()::error", error);
        }
    }

    async getAllregisteredEvents(userId) {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.event_attend_collection_id, [Query.equal("student_id", userId)]);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::getAllregisteredEvents()::error", error);
        }
    }

    async getAllregisteredEventsDetails(queries) {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.event_collection_id, queries);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::getAllregisteredEventsDetails()::error", error);
        }
    }

    async createTransaction(userId, eventId, txnId) {
        try {
            return await this.databases.createDocument(conf.db_id, conf.txns_collection_id, ID.unique(),
                { userId, eventId, txn_id: txnId }
            );
        } catch (error) {
            console.log("DBService::createTransaction()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getAnnouncements(queries = []) {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.announcements_collection_id, queries);
        } catch (error) {
            console.log("DBService::getAnnouncements()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async createAnnouncement(title, description) {
        /*
        title
        description
        date
        university(relation to university)
        organizer(relation to organizer)
        */

        try {
            return await this.databases.createDocument(conf.db_id, conf.student_collection_id, ID.unique(),
                { title, description, }
            );
        } catch (error) {
            console.log("DBService::createAnnouncement()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

}

const dbService = new DBService();

export default dbService;