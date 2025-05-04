import db from "../database/db.js";

export const getAllAssignedItems = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM ZimmetliUrunler");
    if (rows.length === 0) {
      return res.status(404).json({ message: "No assigned items found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getAssignedItemById = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM ZimmetliUrunler WHERE Id = ?",
      [Id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Assigned item not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateAssignedItem = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const {
      TeslimEden,
      TeslimAlan,
      TeslimEtmeTarihi,
      TeslimAlmaTarihi,
      TeslimAlindi,
    } = req.body;
    const [result] = await db.query(
      "UPDATE ZimmetliUrunler SET TeslimEden = ?, TeslimAlan = ?, TeslimEtmeTarihi = ?, TeslimAlmaTarihi = ?, TeslimAlindi = ? WHERE Id = ?",
      [
        TeslimEden,
        TeslimAlan,
        TeslimEtmeTarihi,
        TeslimAlmaTarihi,
        TeslimAlindi,
        Id,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Assigned item not found" });
    }
    res.status(200).json({ message: "Assigned item updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignedItem = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const [result] = await db.query(
      "DELETE FROM ZimmetliUrunler WHERE Id = ?",
      [Id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Assigned item not found" });
    }
  } catch (error) {
    next(error);
  }
};
