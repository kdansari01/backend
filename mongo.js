const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/kdweb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfully");
  })
  .catch((e) => {
    console.log(e);
  });
