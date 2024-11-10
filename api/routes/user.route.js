import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/", getUsers); //This is for testing purpose

export default router;