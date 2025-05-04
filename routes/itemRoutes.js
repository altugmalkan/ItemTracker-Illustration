import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  assignItemById,
  createMultipleItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:Id", getItemById);
router.post("/", createItem);
router.put("/:Id", updateItem);
router.delete("/:Id", deleteItem);
router.post("/assign/:Id", assignItemById);
router.post("/createMultiple", createMultipleItems);

export default router;
