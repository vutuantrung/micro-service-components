"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoService = void 0;
const mongodb_1 = require("mongodb");
const db_config_json_1 = __importDefault(require("../config/db.config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
class MongoService {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new MongoService();
        }
        return this.instance;
    }
    static getClientInstance() {
        if (!this.mongoClient) {
            this.mongoClient = new mongodb_1.MongoClient(db_config_json_1.default.url);
        }
        return this.mongoClient;
    }
    static connectDatabase(dbName) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            return this.mongoClient.db(dbName);
        }
        catch (error) {
            console.log("[connectDatabase]", error.message);
            throw error;
        }
    }
    static createCollection(dbName, collectionName) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            this.mongoClient.db(dbName).createCollection(collectionName);
        }
        catch (error) {
            console.log("[createCollection]", error.message);
            throw error;
        }
    }
    static getCollection(dbName, collectionName) {
        try {
            if (!this.mongoClient) {
                throw new Error("Mongo client not found");
            }
            return this.mongoClient.db(dbName).collection(collectionName);
        }
        catch (error) {
            console.log("[getCollection]", error.message);
            throw error;
        }
    }
    getMongooseInstance() {
        if (mongoose_1.default.connection.readyState === 0) {
            mongoose_1.default.connect(db_config_json_1.default.url);
        }
        return mongoose_1.default;
    }
}
exports.MongoService = MongoService;
