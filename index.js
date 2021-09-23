
require('dotenv').config()
const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT||5000;
const CONNECTION_URL =process.env.CONNECTION_URL||'mongodb://localhost:27017/hotelbooking'
app.get('/', function (req, res) {
    res.send("hello")
})

mongoose.connect(CONNECTION_URL,{}).then(()=>console.log("connectd to mongoDB"))
.catch(error=>console.log(error))

app.use('/api/rooms', require('./router/roomRouter'))
app.use('/api/auth', require('./router/authRoutes'))
app.use('/api/bookings', require('./router/bookingRoutes'))

app.listen(PORT, ()=>console.log(`server is running on http://localhost:${PORT}`))