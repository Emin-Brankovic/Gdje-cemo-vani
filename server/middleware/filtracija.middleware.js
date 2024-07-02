// import Mjesto from "../model/Mjesto.model.js";

// export const getByKategorijaDaljina= async (req,res,next)=>{
//     const {kategorija,daljina}=req.query;
//     if(kategorija.length===0){
//         next();
//     }
//    else if(daljina.length===0){
//          next();
//      }
//     else{
//         let mjesta = [];
//         try {
//           mjesta= await Mjesto.find({ kategorija: kategorija, daljina: daljina });
//           res.send(mjesta);
//         } catch (error) {
//           res.status(500).send("Could not fetch mjesta")
//         }
//     }
// }


// export const getByKategorij= async (req,res,next)=>{
//   const {kategorija}=req.query;
//   if(kategorija.length===0){
//     next();
//   }
//   else{
//       let mjesta = [];
//     try {
//           mjesta= await Mjesto.find({ kategorija: kategorija});
//         res.send(mjesta);
//         } 
//     catch (error) {
//         res.status(500).send("Could not fetch mjesta")
//         }
//   }
// }
// export const getByDaljina= async (req,res)=>{
//   const {daljina}=req.query;
//    let mjesta = [];
//   try {
//        mjesta= await Mjesto.find({ daljina: daljina});
//       res.send(mjesta);
//       } 
//   catch (error) {
//       res.status(500).send("Could not fetch mjesta")
//       }
// }
