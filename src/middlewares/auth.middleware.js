import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Logar todos os headers para depuração
  console.log('Headers recebidos:', req.headers);

  // Tentar acessar o header Authorization de várias formas
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log('Header Authorization (bruto):', authHeader);

  // Verificar se o header existe
  if (!authHeader) {
    console.log('Header Authorization ausente');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // Usar uma expressão regular para extrair o token
  const tokenMatch = authHeader.match(/^Bearer\s+(\S+)/i);
  console.log('Resultado do match:', tokenMatch);

  if (!tokenMatch) {
    console.log('Header Authorization não contém Bearer token');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = tokenMatch[1];
  console.log('Token extraído:', token);

  if (!token) {
    console.log('Token não encontrado após extração');
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