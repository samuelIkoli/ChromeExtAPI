const express = require("express");
const app = express();
const connectDB = require("./config/config");
require("dotenv").config();
const { readdirSync } = require("fs");
const cors = require("cors");
// const sequelize = require("./config/config");
require("./models/Upload");

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swaggerConfig.js");

// var options = {
//   explorer: true,
// };

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, options)
// );
// const specs = require("./swaggerConfig");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));

readdirSync("./routes").map((path) => {
  app.use("/api", require(`./routes/${path}`));
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
