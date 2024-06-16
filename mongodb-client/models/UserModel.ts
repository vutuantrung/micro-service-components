import { Schema } from "mongoose";
import { MongoService } from "../services/MongoService";

export type User = {
    name: string;
    age?: number;
    roles?: string[];
};

export const UserSchema = new Schema({
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

export const UserModel = MongoService.getInstance()
    .getMongooseInstance()
    .model("User", UserSchema);
