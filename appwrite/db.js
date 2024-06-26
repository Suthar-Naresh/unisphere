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

    async createStudent({ name, email, university, roll, contact }) {
        try {
            return await this.databases.createDocument(conf.db_id, conf.student_collection_id, ID.unique(),
                { name, email, university, roll, contact }
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
                    Query.equal("scope", "uni_only"),
                    Query.orderDesc("$createdAt")
                ]
            );
        } catch (error) {
            console.log(error);
            throw new Error("DBService::allEvents()::error", error);
        }
    }

    async allEvents2(university_id, events) {
        try {
            const list = await this.databases.listDocuments(conf.db_id, conf.event_collection_id,
                [
                    Query.equal("university_id", university_id),
                    Query.equal("scope", "uni_only"),
                    Query.orderDesc("$createdAt")
                ]
            );

            return list.documents.filter(evt => !events.includes(evt.$id));
        } catch (error) {
            console.log(error);
            throw new Error("DBService::allEvents2()::error", error);
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
            const res = await this.databases.createDocument(conf.db_id, conf.announcements_collection_id, ID.unique(),
                { title, description, university_id: uniId, organizer: orgId, date: current }
            );
            return res;
        } catch (error) {
            console.log("DBService::createAnnouncement()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async createNewEvent(posterURL, eventData) {

        /*
                poster
                price
                event_name
                event_description
                scope
                registration_start
                registration_end
                event_ends
                organizer_name(relation >=> docID)
                event_starts
                university_id
                venue
        */

        try {
            return await this.databases.createDocument(conf.db_id, conf.event_collection_id, ID.unique(),
                {
                    poster: posterURL,
                    price: eventData.price,
                    event_name: eventData.event_name,
                    event_description: eventData.event_description,
                    scope: eventData.scope,
                    registration_start: eventData.registration_start,
                    registration_end: eventData.registration_end,
                    event_ends: eventData.event_ends,
                    organizer_name: eventData.organizer_name,
                    event_starts: eventData.event_starts,
                    university_id: eventData.university_id,
                    venue: eventData.venue
                }
            );
        } catch (error) {
            console.log("DBService::createEvent()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async fetchExternalEvents() {
        try {
            return await this.databases.listDocuments(conf.db_id, conf.event_collection_id,
                [
                    Query.equal("scope", "for_all"),
                    Query.orderDesc("$createdAt")
                ]
            );
        } catch (error) {
            console.log("DBService::fetchExternalEvents()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getEventsOfOrganizer(university_id, docID) {
        try {
            const list = await this.databases.listDocuments(conf.db_id, conf.event_collection_id,
                [
                    Query.equal("university_id", university_id),
                    Query.orderDesc("$createdAt")
                ]
            );
            console.log(list);
            return list.documents.filter(evnt => evnt.organizer_name.$id === docID);
        } catch (error) {
            console.log("DBService::getEventsOfOrganizer()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getStats(event_id) {
        try {
            const list = await this.databases.listDocuments(conf.db_id, conf.event_attend_collection_id,
                [
                    Query.equal("event_id", event_id)
                ]
            );
            const students = list.documents.map(st => st.student_id);

            if (students.length > 0) {
                // fetch student details
                try {
                    const res = await this.databases.listDocuments(conf.db_id, conf.student_collection_id,
                        [
                            Query.equal("$id", students)
                        ]
                    );
                    return res.documents;
                } catch (error) {
                    console.log("DBService::getStats()::fetching students::error", error.type);
                    console.log(error);
                    throw new Error(error.message);
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log("DBService::getStats()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async checkIfUserRegistered(student_id, event_id) {
        try {
            const list = await this.databases.listDocuments(conf.db_id, conf.event_attend_collection_id,
                [
                    Query.equal("event_id", event_id),
                    Query.equal("student_id", student_id)
                ]
            );

            return list.total;
        } catch (error) {
            console.log("DBService::checkIfUserRegistered()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async uniSubscribed(university_id) {
        try {
            const { subscribed } = await this.databases.getDocument(conf.db_id, conf.university_collection_id, university_id);
            return subscribed;
        } catch (error) {
            console.log("DBService::uniSubscribed()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

}

const dbService = new DBService();

export default dbService;