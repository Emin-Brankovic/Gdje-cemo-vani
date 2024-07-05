import mongoose, { Model } from "mongoose";

const {Schema}=mongoose;

const MjestoSchema=new Schema({
    naziv:String,
    kategorija:String,
    rating:[{type:Number}],
    naselje:String
});


const Mjesto=mongoose.model("mjesto",MjestoSchema);

export default Mjesto;