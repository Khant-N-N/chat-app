import mongoose from "mongoose";
import "dotenv/config";
import env from "./utils/envalid";
import app from "./app";

mongoose
  .connect(env.MONGO)
  .then(() => {
    app.listen(env.PORT, () => console.log("server start on port ", env.PORT));
    console.log("mongoDb connected");
  })
  .catch(console.error);
