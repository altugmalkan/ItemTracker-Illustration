import db from "../database/db.js";

export const getAllItems = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM Urunler");
    if (rows.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const [rows] = await db.query("SELECT * FROM Urunler WHERE Id = ?", [Id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const { UrunCinsi, Adet, DemirbasNo, SatNo, Fatura, FaturaTarihi } =
      req.body;
    const [result] = await db.query(
      "INSERT INTO Urunler ( UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi) VALUES (?, ?, ?, ?, ?, ?)",
      [UrunCinsi, Adet, DemirbasNo, SatNo, Fatura, FaturaTarihi]
    );
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to create item" });
    }
    const [rows] = await db.query("SELECT * FROM Urunler WHERE Id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const { UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi } =
      req.body;
    const [result] = await db.query(
      "UPDATE Urunler SET UrunCinsi = ?, Adet = ?, DemirbasNo = ?, SatNo = ?, FaturaNo= ?, FaturaTarihi = ? WHERE Id = ?",
      [UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi, Id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { Id } = req.params;
    const [result] = await db.query("DELETE FROM Urunler WHERE Id = ?", [Id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const createMultipleItems = async (req, res, next) => {
  try {
    const items = req.body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Invalid request format. 'items' should be a non-empty array.",
      });
    }

    const results = [];
    const errors = [];

    // Process each item in sequence
    for (const item of items) {
      try {
        const { UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi } =
          item;

        const [result] = await db.query(
          "INSERT INTO Urunler (UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi) VALUES (?, ?, ?, ?, ?, ?)",
          [UrunCinsi, Adet, DemirbasNo, SatNo, FaturaNo, FaturaTarihi]
        );

        if (result.affectedRows === 0) {
          errors.push({ item, message: "Failed to create item" });
          continue;
        }

        const [rows] = await db.query("SELECT * FROM Urunler WHERE Id = ?", [
          result.insertId,
        ]);
        results.push(rows[0]);
      } catch (itemError) {
        errors.push({ item, message: itemError.message });
      }
    }

    res.status(201).json({
      success: results.length > 0,
      message: `Successfully created ${results.length} items out of ${items.length}`,
      createdItems: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Bulk creation error:", error);
    next(error);
  }
};
