import express from "express";

import {getNaselja,createNaselje} from "../controller/Naselje.controller.js"

const router=express.Router();

router.get("/",getNaselja);
router.post("/create", createNaselje);

export default router;