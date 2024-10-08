const mongoose = require("mongoose");
const app = require("./app");

let server;

mongoose.set("strictQuery", false);
mongoose
  .connect("add your db link", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log(`Connected to MongoDB => ${"add your db link"}`);
    server = app.listen(3000, () => {
      console.log(`Node server listening on port => ${3000}`);
    });
  });
