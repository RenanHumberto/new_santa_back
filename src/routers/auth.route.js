import express from 'express'; // Adicione esta linha
import { login, getUsuario } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/login', login); // Endpoint para login
route.get('/usuario', getUsuario); // Endpoint para buscar dados do usuário autenticado

export default route;