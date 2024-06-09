import mongoose from "mongoose";
import Mjesto from "../model/Mjesto.model.js";

export const getAllMjesta=async(req,res,next)=>
{
    const {kategorija,daljina,}=req.query;
    if(kategorija.length!==0 || daljina.length!==0){
        next();
    }
    else{
       
        try {
            let mjesto=[];
            mjesto=await Mjesto.find()
            res.send(mjesto);    
        } 
        catch (error) {
            res.status(500).send("Nema mjesta");
        }
    }
    
};

export const getMjestoByName=async(req,res)=>{
    const nazivMjesta=req.params.naziv;
    let filter=new RegExp(nazivMjesta,'i');
    let query={
        $or:[
            {naziv:filter},
            {naziv:" "}
        ]
    };

    try{
        const mjesta=await Mjesto.find(query);
        res.status(200).send(mjesta);
    }
    catch (error) {
             res.status(404).send("Mjesto not found");
        }

}

export const createMjesto=async(req,res)=>{
    const mjesto=req.body;
    const mjestoToSave=new Mjesto(mjesto);

    try {
        const result=await mjestoToSave.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Could not create mjesto")
    }
}

export const RateMjesto=async(req,res)=>{
    const ratingMjesta=req.body;
    const id=ratingMjesta._id;
    const ratingNiz=ratingMjesta.rating;
    try {
     const result=await Mjesto.updateOne({_id:id},{rating:ratingNiz})
     res.status(200).send("Update mjesto");   
    } 
    catch (error) {
        res.status(500).send(error);
    }
}

export const updateMjesto=async(req,res)=>{
    const mjestoToSave=req.body;
    const id=mjestoToSave._id;
    try {
     const result=await Mjesto.updateOne({_id:id},mjestoToSave)
     res.status(200).send("Update mjesto");   
    } 
    catch (error) {
        res.status(500).send(error);
    }
}

export const deleteMjesto=async(req,res)=>{
    const mjestoID=req.params.idMjesta;
     try {
         const result=await Mjesto.deleteOne({_id:mjestoID});
         res.status(200).send(result)
     } 
     catch (error) {
        res.status(404).send(error);    
     }
}