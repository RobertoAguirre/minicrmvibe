import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI no definida en .env');
  await mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  });
  const name = mongoose.connection.db?.databaseName ?? 'minicrm';
  console.log('Conectado a MongoDB:', name);
}
