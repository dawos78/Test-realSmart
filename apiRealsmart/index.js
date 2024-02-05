const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const app = express()
const mongoose = require("mongoose");
dotenv.config();


app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000",
            "http://localhost:5173",
        ],
    })
);
app.use(express.json());


//mongo connect
const database = process.env.MONGO;
mongoose
    .connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connect MongoDB!");
    })
    .catch((err) => console.log(err));



app.use('/api', require('./router/user.routes'));

const port = process.env.port ? process.env.port : 8000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})