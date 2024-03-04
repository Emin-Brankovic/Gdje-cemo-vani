import express from "express";
import {
  getAllMjesta,
  createMjesto,
  getMjestoByName,
  updateMjesto,
  deleteMjesto,
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
router.put("/update", updateMjesto);
router.delete("/delete",deleteMjesto)

export default router;
