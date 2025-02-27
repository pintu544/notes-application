import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined. Please check your environment variables.'.red.bold);
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;