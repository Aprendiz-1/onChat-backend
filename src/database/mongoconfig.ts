import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('Database connected!'))
    .catch((error) => console.log(error));
};

export { connectDatabase };
