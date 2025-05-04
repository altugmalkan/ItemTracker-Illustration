import express from "express";

import {
  getAllAssignedItems,
  getAssignedItemById,
  updateAssignedItem,
  deleteAssignedItem,
} from "../controllers/assignedController.js";

const router = express.Router();

router.get("/", getAllAssignedItems);
router.get("/:Id", getAssignedItemById);
router.put("/:Id", updateAssignedItem);
router.delete("/:Id", deleteAssignedItem);

export default router;
