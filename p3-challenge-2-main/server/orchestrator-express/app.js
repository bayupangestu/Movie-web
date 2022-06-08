const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const routerIndex = require("./routes/index.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerIndex);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
