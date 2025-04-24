import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  console.log('Token recebido no authMiddleware:', token); // Log para depuração
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado no authMiddleware:', decoded); // Log para depuração
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro no authMiddleware:', error.message); // Log para depuração
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;