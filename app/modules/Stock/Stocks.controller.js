
import Stock from "./Stocks.model.js";

export async function getAllStocks(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const [result, totalStocks] = await Promise.all([
      Stock.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Stock.countDocuments()
    ]);

    

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStocks,
        totalPages: Math.ceil(totalStocks / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}



export async function getStocksByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalStocks] = await Promise.all([
      Stock.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Stock.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalStocks,
        totalPages: Math.ceil(totalStocks / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}


// Get stock by ID
export async function getStockById(req, res) {
  const id = req.params.id;
  try {
    const result = await Stock.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new stock
export async function createStock(req, res) {
  try {
    const stockData = req.body;
    const result = await Stock.create(stockData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a stock by ID
export async function updateStock(req, res) {
  const id = req.params.id;
  const stockData = req.body;
  try {
    const result = await Stock.findByIdAndUpdate(id, stockData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a stock by ID
export async function removeStock(req, res) {
  const id = req.params.id;
  try {
    const result = await Stock.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Stock deleted successfully" });
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}