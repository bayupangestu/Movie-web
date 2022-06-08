const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const { connect } = require("./config/mongodb");
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

connect()
  .then((db) => {
    console.log("db: ", db);
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
