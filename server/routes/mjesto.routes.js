import express from "express";
import {
  getAllMjesta,
  createMjesto,
  getMjestoByName,
  RateMjesto,
  deleteMjesto,
  updateMjesto,
} from "../controller/Mjesto.controller.js";
import {
  getByKategorijaDaljina,
  getByKategorij,
  getByDaljina,
} from "../middleware/filtracija.middleware.js";
const router = express.Router();

router.get(
  "/",
  getAllMjesta,
  getByKategorijaDaljina,
  getByKategorij,
  getByDaljina
);
router.get("/:naziv", getMjestoByName);
router.post("/create", createMjesto);
router.put("/rate", RateMjesto);
router.put("/update",updateMjesto)
router.delete("/delete/:idMjesta",deleteMjesto)

export default router;
