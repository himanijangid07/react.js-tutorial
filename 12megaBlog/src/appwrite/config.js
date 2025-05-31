import conf from "../conf/conf"

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, featuredImage, slug, status, userId, content }) {
    try {
        console.log("Creating post with userId:", userId);

        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                userId,
                status
            }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return null;
    }
}



    async updatePost(slug, {title, featuredImage, status, content}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error updating post...", error)
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Error deleting post...", error)
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error getting post...", error)
            throw error
        }
    }

    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error listing posts...", error)
            throw error
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return response
        } catch (error) {
            console.log("Error uploading file...", error)
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error deleting file...", error)
            throw error
        }
    }

    // Add this method inside your Service class (e.g. appwrite/config.js)

getFileView(fileId) {
  try {
    // Returns the direct URL to the file (string)
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  } catch (error) {
    console.error("Error fetching file view URL:", error);
    throw error;
  }
}


}

const service = new Service()

export default service