import mongoose from "mongoose";
import Mjesto from "../model/Mjesto.model.js";

export const getAllMjesta=async(req,res)=>
{
    //const nazivMjesta=req.naziv;
    //console.log(req.naziv);

    try {
        let mjesto=[];
        mjesto=await Mjesto.find()
        console.log(mjesto);
        res.send(mjesto);    
    } 
    catch (error) {
        res.status(500).send("Nema mjesta");
    }
};

export const getMjestoByName=async(req,res)=>{
    const nazivMjesta=req.params.naziv;
    try {
        const mjesto=await Mjesto.findOne({naziv:nazivMjesta})
        res.status(200).send(mjesto);
    } catch (error) {
        res.status(404).send("Mjesto not found");
    }
}

export const creatMjesto=async(req,res)=>{
    const mjesto=req.body;
    const mjestoToSave=new Mjesto(mjesto);

    try {
        const result=await mjestoToSave.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Could not create mjesto")
    }
}