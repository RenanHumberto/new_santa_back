import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const route = express.Router();

route.post('/login', authController.login);
route.get('/usuario', authMiddleware, authController.getUser);

export default route;