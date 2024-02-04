const express = require("express");
const customersRouter = require("./routers/customersRouter");

var cors = require("cors");
let app = express();

app.use(express.json());
app.use(cors());

app.use("/api/customers", customersRouter);

app.listen(8000);
