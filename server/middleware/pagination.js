import Mjesto from "../model/Mjesto.model.js";

export const paginatedResults=async(req,res,next)=> {
  
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const {kategorija,daljina}=req.query;

    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    let numberOfElements;

    const results={};

    if (endIndex < numberOfElements ) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      results.currentPage=page;

      try {
        if(kategorija.length!==0 && daljina.length!==0){
            results.results = await Mjesto.find({ kategorija: kategorija, daljina: daljina}).limit(limit).skip(startIndex).exec()
            numberOfElements=await Mjesto.countDocuments({ kategorija: kategorija, daljina: daljina}).exec();
            results.lastPage=Math.ceil(numberOfElements/limit);
            res.paginatedResults = results
            next()
        }
        else if(kategorija.length!==0 && daljina.length===0){
            results.results = await Mjesto.find({ kategorija: kategorija}).limit(limit).skip(startIndex).exec()
            numberOfElements=await Mjesto.countDocuments({ kategorija: kategorija}).exec();
            results.lastPage=Math.ceil(numberOfElements/limit);
            res.paginatedResults = results
            next()
        }
        else if(kategorija.length===0 && daljina.length!==0){
            results.results = await Mjesto.find({ daljina: daljina}).limit(limit).skip(startIndex).exec()
            numberOfElements=await Mjesto.countDocuments({ daljina: daljina}).exec();
            results.lastPage=Math.ceil(numberOfElements/limit);
            res.paginatedResults = results
            next()
        }
        else{
            results.results = await Mjesto.find().limit(limit).skip(startIndex).exec()
            numberOfElements=await Mjesto.countDocuments().exec();
            results.lastPage=Math.ceil(numberOfElements/limit);
            res.paginatedResults = results
            next()
        }
      } catch (e) {
        res.status(500).send({ message: e.message })
      }
}
