import {conf} from "../conf/conf"
import { Client,Account,Databases,Storage,Query, ID } from "appwrite"
const conf={
    appwriteUrl:String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId:String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(process.env.REACT_APP_APPWRITE_BUCKET_ID)
}
export default conf;
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket= new Storage(this.client);
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Appwrite Service :: getPost()::",error);
            return false;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
        } catch (error) {
            console.log("Appwrite Service :: getPosts()::",error);
            return false;
        }
    }
    async createPost({title,slug,content,featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,slug,content,featuredImage, status, userId})
        } catch (error) {
            console.log("Appwrite Service :: createPost()::",error);
            return false;
        }
    }
    async updatePost(slug,{title,content,status,featuredImage}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,status,featuredImage});
        } catch (error) {
            console.log("Appwrite Service :: updatePost()::",error);
            return false;
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost()::",error);
            return false;
        }
    }
    // storage services
    async uploadFile(){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
        } catch (error) {
            console.log("Appwrite Service :: uploadFile()::",error);
            return false;
        }
    }
    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId,fileID);
        } catch (error) {
            console.log("Appwrite Service :: deleteFile()::",error);
            return false;
        }
    }
    getFilePreview(fileID){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileID).href;
    }
}