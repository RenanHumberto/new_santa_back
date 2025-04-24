import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        console.log("Espere a conexão com o banco de dados, por favor...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Atlas Conectado!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

export default connectDatabase;
//5vSJTTFozXm0w86L

//.connect("mongodb+srv://renanhumberto:5vSJTTFozXm0w86L@cluster0.iiuib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")