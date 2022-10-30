const express = require("express");
const app = express();

const companyRoutes = require("./src/entities/companies/company.router");

app.get("/", (req, res) => {
  res.send("Okay");
});
app.use("/api/v1/company", companyRoutes);

app.listen(5000, () => {
  console.log("Marketing program is running on port 5000");
});
