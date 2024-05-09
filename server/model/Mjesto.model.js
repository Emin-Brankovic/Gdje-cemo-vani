import mongoose, { Model } from "mongoose";

const {Schema}=mongoose;

const MjestoSchema=new Schema({
    naziv:String,
    kategorija:String,
    daljina:String
});

const Mjesto=mongoose.model("mjesto",MjestoSchema);

export default Mjesto;