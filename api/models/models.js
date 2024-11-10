import mongoose, { Schema, model } from "mongoose";


const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    progress: { type: String, default: "To Do" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
});


const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [taskSchema], 
}, {
    timestamps: true 
});


const Task = model("Task", taskSchema);
const User = model("User", userSchema);

export { Task, User };
