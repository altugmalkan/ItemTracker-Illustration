import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createMultipleItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:Id", getItemById);
router.post("/", createItem);
router.put("/:Id", updateItem);
router.delete("/:Id", deleteItem);
router.post("/createMultiple", createMultipleItems);

export default router;

// router.post("/assignById", assignById);
