//import modules
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(cookieParser())
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/users', require('./routes/user.route'))
app.use('/stations', require('./routes/station.route'))
app.use('/offices', require('./routes/office.route'))
app.use('/orders', require('./routes/order.route'))
app.use('/', require('./routes/auth.route'));

connectDB().then(
    () => {
        console.log('Mongoose connection established')
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    },
    err => {
        console.log(err)
    }
)