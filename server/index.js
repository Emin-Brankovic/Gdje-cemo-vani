import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mjestoRouter from "./routes/mjesto.routes.js";
import naseljeRouter from "./routes/naselje.routes.js"
const app=express();
const PORT=3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
  });

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use('/mjesto',mjestoRouter);
app.use('/naselje',naseljeRouter);

app.get('/',(req,res)=>{
        res.send("Hello World!");
     });

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`);
})



 let db='mongodb://127.0.0.1:27017/Date-night-picker'
mongoose.connect(db)
.then(()=>{console.log("Connected!")});
