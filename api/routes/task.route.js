import express from 'express';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/addTask", verifyToken, addTask);
router.get("/getTasks", verifyToken, getTasks);
router.put("/updateTask", verifyToken, updateTask);
router.delete("/deleteTask", verifyToken, deleteTask);

export default router;
