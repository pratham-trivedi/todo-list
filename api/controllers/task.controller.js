import { Task } from '../models/models.js';

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;

        console.log(userId);

        const newTask = new Task({
            title,
            description,
            createdBy: userId
        });

        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
    }
};


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId, progress } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, createdBy: req.userId },
            { progress },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, createdBy: req.userId });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
