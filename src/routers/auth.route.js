import express from 'express';
import authController from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/login', authController.login);
route.get('/usuario', authController.getUser); // Corrigido de getUsuario para getUser

export default route;