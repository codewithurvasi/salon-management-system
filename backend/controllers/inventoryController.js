import Inventory from "../models/Inventory.js";

// GET all items
export const getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// ADD item
export const addInventoryItem = async (req, res) => {
  try {
    const { name, quantity, category } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({
        status: "error",
        message: "Name & quantity required",
      });
    }

    const item = await Inventory.create({
      name,
      quantity,
      category,
    });

    res.status(201).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// DELETE item
export const deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};