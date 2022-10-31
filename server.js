require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");

// express middleware
app.use(express.json());
app.use(cors());

// custom middlewares
const notFound = require("./src/utils/errors/not.found");
const errorHandler = require("./src/utils/errors/custom.error.handler");

// app routes
const companyRoutes = require("./src/entities/companies/company.router");
const userRoutes = require("./src/entities/users/user.router");

app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/user", userRoutes);

//error Handling
app.use(notFound);
app.use(errorHandler);

// server listen
app.listen(5000, () => {
  console.log("Marketing program is running on port 5000");
});
