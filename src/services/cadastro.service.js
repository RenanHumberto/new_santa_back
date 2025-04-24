import cadastro from '../models/cadastro.Model.js';
// const cadastro = require('../models/cadastro.Model.js');
//o find, create, findbyid são metodos do moongose
const createService = (body) => cadastro.create(body);
//recebe os daodos do body e envia eles
const findAllService = () => cadastro.find();
const findByIdService = (id) => cadastro.findById(id);
const updateService = (id, updateObject) => cadastro.findOneAndUpdate(
    {_id: id},
    updateObject,
    {new: true});

export default  {
    createService,
    findAllService,
    findByIdService,
    updateService
};