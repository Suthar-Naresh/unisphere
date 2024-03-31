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

    async getUniversities() {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.university_collection_id);
        } catch (error) {
            console.log(error);
            throw new Error("DBService::getUniversities()::error", error);
        }
    }

    async allEvents(university_id) {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.event_collection_id,
                [
                    Query.equal("university_id", university_id),
                    Query.orderDesc("$createdAt")
                ]
            );
        } catch (error) {
            console.log(error);
            throw new Error("DBService::allEvents()::error", error);
        }
    }

    async registerStudentInEvent(studentId, eventId) {
        try {
            return await this.databases.createDocument(conf.db_id, conf.event_attend_collection_id, ID.unique(), { student_id: studentId, event_id: eventId });
        } catch (error) {
            console.log("DBService::registerStudentInEvent()::error", error.type);
            console.log(error);
            throw new Error(error.message);
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

    async getAnnouncements(university_id) {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.announcements_collection_id,
                [
                    Query.equal("university_id", university_id),
                    Query.orderDesc("$createdAt")
                ]
            );
        } catch (error) {
            console.log("DBService::getAnnouncements()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async createAnnouncement(title, description, uniId, orgId) {

        const current = new Date().toISOString();

        try {
            return await this.databases.createDocument(conf.db_id, conf.announcements_collection_id, ID.unique(),
                { title, description, university_id: uniId, organizer: orgId, date: current }
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