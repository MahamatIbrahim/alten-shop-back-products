import { connect, disconnect } from "mongoose";
import { config } from "dotenv";

config();

async function connectDB() {
    try {
      useNewUrlParser: true;
      useUnifiedTopology: true;
      console.log("Opening connection");
      const conn = await connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      disconnect();
      console.error(err);
      process.exit(1);
    }
  }
  
  export default connectDB;
