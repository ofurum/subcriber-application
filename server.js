const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

const subscribersRouter = require('./routes/subscribers')
app.use("/subscribers", subscribersRouter);


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection
db.on("error", error => console.log('error', error))
db.once("open", () => console.log('connected to database...'))












const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on  ${port}...`));