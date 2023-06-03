import mongoose from "mongoose";

const Connection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("🚀 Connection to mongo DB");
    })
    .catch((err) => console.log(err));
};
export default Connection;
