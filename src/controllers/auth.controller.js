import cadastroService from '../services/cadastro.service.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const cadastro = await cadastroService.findByEmail(email);
    if (!cadastro) {
      return res.status(400).json({ message: 'Login ou senha inválidos' });
    }

    const isMatch = await cadastro.comparePassword(senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Login ou senha inválidos' });
    }

    const token = jwt.sign({ id: cadastro._id }, process.env.JWT_SECRET || 'seu-segredo-aqui', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token recebido no getUser:', token); // Log para depuração
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu-segredo-aqui');
    console.log('Token decodificado:', decoded); // Log para depuração

    const cadastro = await cadastroService.findByIdService(decoded.id);
    if (!cadastro) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ _id: cadastro._id, email: cadastro.email, plano: cadastro.plano });
  } catch (error) {
    console.error('Erro no getUser:', error.message); // Log para depuração
    res.status(500).json({ message: error.message });
  }
};

export default { login, getUser };