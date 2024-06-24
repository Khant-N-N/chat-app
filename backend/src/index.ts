import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";

mongoose
  .connect(process.env.MONGO!)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("server start on port ", process.env.PORT)
    );
    console.log("mongoDb connected");
  })
  .catch(console.error);
