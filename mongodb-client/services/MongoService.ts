import { MongoClient } from "mongodb";
import config from "../config/db.config.json";
import mongoose from "mongoose";

export class MongoService {
    private static mongoClient?: MongoClient;
    private static instance?: MongoService;

    protected constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongoService();
        }
        return this.instance;
    }

    public static getClientInstance() {
        if (!this.mongoClient) {
            this.mongoClient = new MongoClient(config.url);
        }
        return this.mongoClient;
    }

    public static connectDatabase(dbName: string) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            return this.mongoClient.db(dbName);
        } catch (error: any) {
            console.log("[connectDatabase]", error.message);
            throw error;
        }
    }

    public static createCollection(dbName: string, collectionName: string) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            this.mongoClient.db(dbName).createCollection(collectionName);
        } catch (error: any) {
            console.log("[createCollection]", error.message);
            throw error;
        }
    }

    public static getCollection(dbName: string, collectionName: string) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            return this.mongoClient.db(dbName).collection(collectionName);
        } catch (error: any) {
            console.log("[getCollection]", error.message);
            throw error;
        }
    }

    public getMongooseInstance() {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect(config.url);
        }
        return mongoose;
    }
}
