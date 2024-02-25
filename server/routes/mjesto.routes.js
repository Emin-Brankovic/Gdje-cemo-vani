 import express from "express";
import { getAllMjesta,creatMjesto,getMjestoByName } from "../controller/Mjesto.controller.js";

 const router=express.Router();

 router.get("/",getAllMjesta);
 router.get("/:naziv",getMjestoByName);
 router.post("/create",creatMjesto);

 export default router;