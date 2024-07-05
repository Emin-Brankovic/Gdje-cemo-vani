import mongoose from "mongoose";

const {Schema}=mongoose;

const NaseljeSchema=new Schema({
    naziv:String
})

const Naselje=mongoose.model("naselje",NaseljeSchema);

export default Naselje;