import DailyPrice from "./DailyPrices.model.js"
import Purity from "../Purity/Purities.model.js";
import MetalType from "../MetalType/MetalTypes.model.js";

export async function getAllDailyPrices(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalDailyPrices] = await Promise.all([
      DailyPrice.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      DailyPrice.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalDailyPrices,
        totalPages: Math.ceil(totalDailyPrices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}



export async function getDailyPricesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalDailyPrices] = await Promise.all([
      DailyPrice.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      DailyPrice.countDocuments({ branch })
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalDailyPrices,
        totalPages: Math.ceil(totalDailyPrices / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get daily price by ID
export async function getDailyPriceById(req, res) {
  const id = req.params.id;
  try {
    const result = await DailyPrice.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Daily price not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new daily price
export async function createDailyPrice(req, res) {
  try {
    const dailyPriceData = req.body;
    const result = await DailyPrice.create(dailyPriceData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a daily price by ID
export async function updateDailyPrice(req, res) {
  const id = req.params.id;
  const dailyPriceData = req.body;
  try {
    const result = await DailyPrice.findByIdAndUpdate(id, dailyPriceData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Daily price not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a daily price by ID
export async function removeDailyPrice(req, res) {
  const id = req.params.id;
  try {
    const result = await DailyPrice.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Daily price deleted successfully" });
    } else {
      res.status(404).json({ message: "Daily price not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}