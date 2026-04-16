import express from "express";
import {
  getAllInventory,
  addInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventory);
router.post("/", addInventoryItem);
router.delete("/:id", deleteInventoryItem);

export default router;