if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const routerIndex = require("./routes/index.js");
const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerIndex);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
