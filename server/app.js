const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user.route');
const connectDB = require('./utils/db');

app.use('/api/users', userRouter);

app.listen(8080, async () => {
    console.log('Server is running on port 8080');
    await connectDB();
})

module.exports = app;