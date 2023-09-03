import app from "./app.js";
import mongoose from "mongoose";

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    const port = PORT || 4040
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
