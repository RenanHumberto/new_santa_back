import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Logar todos os headers para depuração
  console.log('Headers recebidos:', req.headers);

  // Tentar acessar o header Authorization de várias formas
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log('Header Authorization:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Header Authorization ausente ou mal formatado');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // Extrair o token
  const token = authHeader.split(' ')[1];
  console.log('Token extraído:', token);

  if (!token) {
    console.log('Token não encontrado após split');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro no authMiddleware:', error.message);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;