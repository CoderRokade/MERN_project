import mongoose,{ConnectOptions} from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'env' });


async function connectToDatabase() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true, 
      useUnifiedTopology: true,
     
  })    //mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };