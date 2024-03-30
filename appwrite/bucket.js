import { Client, ID, Storage } from 'appwrite';
import conf from '../conf/conf';

export class BucketService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.endpoint)
            .setProject(conf.project_id);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.bucket_id, ID.unique(), file);
        } catch (error) {
            console.log("BucketService::uploadFile()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async uploadEventPoster(fileURI, fileType) {
        try {
            // Creating file type which is required by the multipart form data
            const file = {
                uri: fileURI,
                name: `File_${Date.now()}`,
                type: fileType,
            };
            
            // Construct the multipart/form-data payload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileId', ID.unique());
            
            const response = await fetch(`${conf.endpoint}/storage/buckets/${conf.bucket_id}/files`, {
                method: 'POST',
                headers: {
                    'X-Appwrite-Project': conf.project_id,
                },
                body: formData,
            });
            
            // Parse the JSON response
            const data = await response.json();
            console.log('Upload response:', data);
            
            if (data) {
                const posterURL = `${conf.endpoint}/storage/buckets/${conf.bucket_id}/files/${data.$id}/preview?project=${conf.project_id}`;
                return posterURL
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
        } catch (error) {
            console.log("BucketService::deleteFile()::error", error.type);
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.bucket_id, fileId);
        } catch (error) {
            throw new Error("BucketService::getFilePreview()::error", error);
        }
    }

    async getPoster(fileId) {
        try {
            return this.bucket.getFile(conf.bucket_id, fileId);
        } catch (error) {
            throw new Error("BucketService::getPoster()::error", error);
        }
    }

    async getAllPosters() {
        try {
            return await this.bucket.listFiles(conf.bucket_id);
        } catch (error) {
            throw new Error("BucketService::getAllPosters()::error", error);
        }
    }
}

const bucketService = new BucketService();

export default bucketService;