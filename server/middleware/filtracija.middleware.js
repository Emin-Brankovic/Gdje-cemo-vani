import Mjesto from "../model/Mjesto.model.js";

export const getByKategorijaDaljina= async (req,res,next)=>{
    const {kategorija,daljina}=req.query;

    if(typeof kategorija !=='undefined'){
        next();
    }
   else if(typeof daljina !=='undefined'){
         next();
     }
    else{
        let mjesta = [];
        try {
          //let query = Mjesto.find({ kategorija: kategorija, daljina: daljina });
          //mjesta = await query.exec();
          mjesta= await Mjesto.find({ kategorija: kategorija, daljina: daljina });
          res.send(mjesta);
        } catch (error) {
          res.status(500).send("Could not fetch mjesta")
        }
    }
}


export const getByKategorij= async (req,res,next)=>{
  const {kategorija}=req.query;
  if(typeof kategorija ==='undefined'){
    next();
  }
  else{
      let mjesta = [];
    try {
          mjesta= await Mjesto.find({ kategorija: kategorija});
        res.send(mjesta);
        } 
    catch (error) {
        res.status(500).send("Could not fetch mjesta")
        }
  }
}
export const getByDaljina= async (req,res)=>{
  const {daljina}=req.query;
  console.log(daljina);
   let mjesta = [];
  try {
       mjesta= await Mjesto.find({ daljina: daljina});
      res.send(mjesta);
      } 
  catch (error) {
      res.status(500).send("Could not fetch mjesta")
      }
}
