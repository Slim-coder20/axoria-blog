import mongoose from "mongoose";

// Cooexion a la base de donnée MogoDB et a notre base de donnée axoriablog // 
export async function connectToDB() {
  if(mongoose.connection.readyState) {
    console.log("using existing connection:", mongoose.connection.name)
    return 
  }
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("connected to database:", mongoose.connection.name)
    
  } catch (error) {
    throw new Error(" Failed ton connect to the database ");
    
  }
}