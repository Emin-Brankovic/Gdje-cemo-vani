import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mjestoRouter from "./routes/mjesto.routes.js";
const app=express();
const PORT=3001;

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use('/mjesto',mjestoRouter);

app.get('/',(req,res)=>{
        res.send("Hello World!");
     });

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`);
})

mongoose.connect('mongodb://127.0.0.1:27017/Date-night-picker')
.then(()=>{console.log("Connected!")});
