"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoService_1 = require("../services/MongoService");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    roles: {
        type: Array,
        required: false,
    },
});
exports.UserModel = MongoService_1.MongoService.getInstance()
    .getMongooseInstance()
    .model("User", exports.UserSchema);
