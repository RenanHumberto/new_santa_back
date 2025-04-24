import { loginService } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Cadastro from "../models/cadastro.Model.js"; // Adicione esta linha

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const cadastro = await loginService(email);

        if (!cadastro) {
            return res.status(404).json({ message: "Login ou senha inválidos" });
        }

        let senhaIsValid = false;
        if (cadastro.senha) {
            senhaIsValid = await cadastro.comparePassword(senha);
        } else if (cadastro.password) {
            senhaIsValid = cadastro.password === senha;
        }

        if (!senhaIsValid) {
            return res.status(401).json({ message: "Login ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: cadastro._id, email: cadastro.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuario = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Cadastro.findById(decoded.id).select("-senha -password");
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário.", error: error.message });
    }
};

export { login, getUsuario };