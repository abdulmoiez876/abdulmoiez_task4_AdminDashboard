import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})

export default mongoose.model('user', usersSchema);