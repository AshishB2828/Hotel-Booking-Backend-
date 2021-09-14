const express= require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const PORT = process.env.PORT||5000;
const CONNECTION_URL =process.env.CONNECTION_URL||'mongodb://localhost:27017/hotelbooking'
app.get('/', function (req, res) {
    res.send("hello")
})

mongoose.connect(CONNECTION_URL,{}).then(()=>console.log("connectd to mongoDB"))
.catch(error=>console.log(error))

app.use('/api/rooms', require('./router/roomRouter'))

app.listen(PORT, ()=>console.log(`server is running on http://localhost:${PORT}`))