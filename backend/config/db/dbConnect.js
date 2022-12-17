const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = async () =>  {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });

        console.log('Connected to db successfully');
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

module.exports = dbConnect;
