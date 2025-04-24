import cadastro from '../models/cadastro.Model.js';

const createService = async (body) => {
  try {
    console.log('Dados recebidos no serviço:', body);
    const newCadastro = await cadastro.create(body);
    console.log('Novo cadastro criado:', newCadastro);
    return newCadastro;
  } catch (error) {
    console.error('Erro no createService:', error.message);
    throw error;
  }
};

const findAllService = async () => {
  try {
    const cadastros = await cadastro.find();
    console.log('Cadastros encontrados:', cadastros);
    return cadastros;
  } catch (error) {
    console.error('Erro no findAllService:', error.message);
    throw error;
  }
};

const findByIdService = async (id) => {
  try {
    const cadastroFound = await cadastro.findById(id);
    console.log('Cadastro encontrado por ID:', cadastroFound);
    return cadastroFound;
  } catch (error) {
    console.error('Erro no findByIdService:', error.message);
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    const cadastroFound = await cadastro.findOne({ email }).select('+senha');
    console.log('Cadastro encontrado por email:', cadastroFound);
    return cadastroFound;
  } catch (error) {
    console.error('Erro no findByEmail:', error.message);
    throw error;
  }
};

const updateService = async (id, updateObject) => {
  try {
    const updatedCadastro = await cadastro.findOneAndUpdate(
      { _id: id },
      updateObject,
      { new: true }
    );
    console.log('Cadastro atualizado:', updatedCadastro);
    return updatedCadastro;
  } catch (error) {
    console.error('Erro no updateService:', error.message);
    throw error;
  }
};

export default {
  createService,
  findAllService,
  findByIdService,
  findByEmail,
  updateService,
};