import mongoose from "mongoose";
 import dotenv from "dotenv";
 dotenv.config();
 const conn = async ()=>{
  try {
    await mongoose.connect(`${process.env.MongoDBURI}`);
    console.log('Connected To Mongoose DB!');
  } catch (error) {
    console.log({Message:error.Message});
    
  }
}

 export default conn();