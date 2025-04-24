import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Para criptografar a senha

const cadastroSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
    },
    plano: {
      type: String,
      enum: ['Ouro', 'Prata', 'Bronze', 'Torcedor'],
      default: 'Torcedor',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// Criptografar a senha antes de salvar
cadastroSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar senhas (usado no login)
cadastroSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha);
};

const Cadastro = mongoose.model('Cadastro', cadastroSchema);

export default Cadastro;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt"

// //nova "tabela" 
// const CadastroSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false
//     }
// });

// CadastroSchema.pre("save", async function (next){
//     this.password = await bcrypt.hashSync(this.password, 10);
//     next();
// }) //crypotagrafando a senha, antes de salvar no banco de dados

// const Cadastro = mongoose.model("Cadastro", CadastroSchema);
// export default  Cadastro; 















// const conexao = require('../database/conexao.js');
// class CadastroModel {
//     lista(){
//         return
//     }

// }

// module.exports = new CadastroModel();
// // O comando module.exports = new CadastroModel(); é usado no Node.js para exportar um módulo,