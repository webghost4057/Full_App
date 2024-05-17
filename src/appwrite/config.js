import conf from '../conf/conf.js'
import { Client, Databases, Storage, query, ID, Account, Query } from "appwrite";


export class Services {
    client = new Client;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases()
        this.bucket = new Bucket()
    }

    async createPost({ Title, Content, featuredImage, status, userID, slug }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    featuredImage,
                    status,
                    userID
                }
            )

        } catch (error) {
            throw error
        }
    }


    async updatePost(slug, { Title, Content, featuredImage, status }) {
        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, {
                Title,
                Content,
                featuredImage,
                status
            }
            )

        } catch (error) {
            throw error
        }
    }

    async deletePost({ slug }) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true

        } catch (error) {
            console.log("Delete error", error);
            return false
        }
    }

    async getPost({ slug }) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )

        } catch (error) {
            console.log("Getting Error during GetPost", error);

        }
    }

    async getallPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,

            )

        } catch (error) {
            console.log("Getting Error during Getting All Posts", error);

        }
    }

    //Storage

    async uploadFile(file) {
        try {
            return await this.bucket(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log(error);
            return false

        }
    }

    async deleteFile({ fileid }) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileid
            )
            return true

        } catch (error) {
            console.log(error);
            return false

        }
    }


    filePreview(fileid) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileid)
    }

}

const services = new Services()

export default services