import cadastroService from "../services/cadastro.service.js";

const create = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        const cadastro = await cadastroService.createService(req.body);

        if (!cadastro) {
            return res.status(400).json({ message: "Erro ao cadastrar" });
        }

        res.status(201).json({
            message: "Cadastro realizado com sucesso",
            cadastro: {
                id: cadastro._id,
                nome,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAll = async (req, res) => {
    try {
        const cadastro = await cadastroService.findAllService();
        if (cadastro.length === 0) {
            return res.status(404).json({ message: "Nenhum cadastro encontrado 😔" });
        }
        res.status(200).json(cadastro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const id = req.id;
        const cadastro = req.cadastro;
        res.status(200).json(cadastro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome && !email && !senha) {
            return res.status(400).json({ message: "Preencha algum dos campos" });
        }

        const id = req.params.id;

        const updateFields = {};
        if (nome) updateFields.nome = nome;
        if (email) updateFields.email = email;
        if (senha) updateFields.senha = senha;

        const updatedCadastro = await cadastroService.updateService(id, updateFields);

        res.json({ message: "Cadastro atualizado com sucesso!!!", cadastro: updatedCadastro });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { create, findAll, findById, update };