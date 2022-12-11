const express = require('express');
const dbConnect = require('./config/db/dbConnect');

const app = express();
const PORT = process.env.PORT || 9000;
dbConnect();

const { userRegisterController } = require('./controllers/users/usersController');

app.use(express.json());
app.post("/api/users/register", userRegisterController);



app.post("/api/users/login", (req, res) => {
    res.json({ user: "User Login" });
});

app.get("/api/users", (req, res) => {
    res.json({ user: "fetch all users" });
});



app.listen(PORT, console.log(`Server is running on ${PORT}`));