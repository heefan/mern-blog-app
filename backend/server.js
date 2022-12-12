const express = require('express')
const dbConnect = require('./config/db/dbConnect');
const userRoutes = require('./router/users/usersRoute');
const {userRouter} = require('./router/users/usersRoute')

const app = express();
const PORT = process.env.PORT || 9000;

// remote database
dbConnect();

// middleware
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

// server
app.listen(PORT, console.log(`Server is running on ${PORT}`));