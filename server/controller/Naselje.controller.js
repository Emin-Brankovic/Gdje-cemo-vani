import Naselje from "../model/Naselje.model.js";

export const getNaselja=async(req,res) =>{
    try {
        const result=await Naselje.find();
        res.status(200).send(result);
        
    } catch (error) {
        res.status(500).send(error);   
    }
}

export const createNaselje=async(req,res)=>{
    const naselje=req.body;
    const naseljeToSave=new Naselje(naselje);

    try {
       const result= await naseljeToSave.save()
       res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Could not create mjesto")
    }
}