const express = require('express');
const dbConnect = require('./config/db/dbConnect');

const app = express();
const PORT = process.env.PORT || 9000;
dbConnect();

app.listen(PORT, console.log(`Server is running on ${PORT}`));