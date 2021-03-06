const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const compression = require('compression');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gihts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/htmlRoutes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
