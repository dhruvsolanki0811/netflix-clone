import mongoose from "mongoose";

const connectDb = async () => {
const dburi=process.env.MONGO_URI?process.env.MONGO_URI:""
  try {
    await mongoose.connect(dburi);
  } catch (error) {
    console.error("db connection error",error);
  }
};
export default connectDb;