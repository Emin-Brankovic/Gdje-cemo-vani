import Mjesto from "../model/Mjesto.model.js";

export const paginatedResults=async(req,res,next)=> {
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const {kategorija,daljina}=req.query;

    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    const numberOfElements=await Mjesto.countDocuments().exec();

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

      results.lastPage=Math.ceil(numberOfElements/limit);
      results.currentPage=page;

      try {
        if(kategorija.length!==0 && daljina.length!==0){
            results.results = await Mjesto.find({ kategorija: kategorija, daljina: daljina}).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        }
        else if(kategorija.length!==0 && daljina.length===0){
            results.results = await Mjesto.find({ kategorija: kategorija}).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        }
        else if(kategorija.length===0 && daljina.length!==0){
            results.results = await Mjesto.find({ daljina: daljina}).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        }
        else{
            results.results = await Mjesto.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        }
      } catch (e) {
        res.status(500).send({ message: e.message })
      }
}
