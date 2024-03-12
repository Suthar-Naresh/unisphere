import { Client, Databases, ID, Storage } from 'appwrite';
import conf from '../conf/conf';

export class BucketService{
    client = new Client();
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.endpoint)
        .setProject(conf.project_id);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketID, ID.unique());
        } catch (error) {
            throw new Error("BucketService::uploadFile()::error", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
        } catch (error) {
            throw new Error("BucketService::deleteFile()::error", error);
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
        } catch (error) {
            throw new Error("BucketService::getFilePreview()::error", error);
        }
    }

    async getPoster(fileId){
        try {
            return this.bucket.getFile(conf.bucket_id, fileId);
        } catch (error) {
            throw new Error("BucketService::getPoster()::error", error);
        }
    }
}

const bucketService = new BucketService();

export default bucketService;