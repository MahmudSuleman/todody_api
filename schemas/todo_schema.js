import mongoose from "mongoose";

const {Schema, model} = mongoose;

const todoSchema = Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date_time: {
        type: String,
        require: true
    },

    status: {
        type: Boolean,
        require: true,
        default: false
    }
});
const todoModel = model('todo', todoSchema);

export default todoModel;
