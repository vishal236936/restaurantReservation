const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const reservationRoutes = require('./src/routes');
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
 

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/reservations',reservationRoutes);

app.get('/',(req,res)=>{
    console.log("Hello Developer")
    res.send("Hello Developer")
})

app.listen(port,()=>{console.log("App is listening to port: "+port)})

module.exports = app;
