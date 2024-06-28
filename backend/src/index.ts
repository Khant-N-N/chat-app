import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";
import env from "./utils/envalid";

mongoose
  .connect(env.MONGO)
  .then(() => {
    app.listen(env.PORT, () => console.log("server start on port ", env.PORT));
    console.log("mongoDb connected");
  })
  .catch(console.error);
