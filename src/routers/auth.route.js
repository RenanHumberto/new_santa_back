import { Router } from 'express';
const route = express.Router();

import { login, getUsuario } from '../controllers/auth.controller.js';

route.post("/login", login);
route.get("/usuario", getUsuario); // Adicione esta linha

export default route;