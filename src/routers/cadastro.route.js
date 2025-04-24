import express from 'express';
import cadastroController from '../controllers/cadastro.controller.js';
import {validId, validCadastro} from '../middlewares/global.middlewares.js';
const route = express.Router();



route.post("/", cadastroController.create);
route.get("/", cadastroController.findAll);
route.get("/:id",validId,validCadastro, cadastroController.findById);
route.patch("/:id",validId,validCadastro, cadastroController.update)

export default route;