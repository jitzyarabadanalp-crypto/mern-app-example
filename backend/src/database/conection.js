import mongoose from 'mongoose';

const connectDB = async (mongoURI) => {
    if(!mongoURI) {
        throw new Error('MONGO_URI is required')
    }
    
      mongoose.set('strictQuery', true);
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected'); 



};
export default connectDB;















