import Cadastro from "../models/cadastro.Model.js";

const loginService = (email) => Cadastro.findOne({ email: email });

export { loginService };