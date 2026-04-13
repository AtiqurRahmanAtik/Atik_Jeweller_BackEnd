import Sale from "./Sales.model.js";

// Get all sales with pagination
export async function getAllSales(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSales] = await Promise.all([
      Sale.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Sale.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSales,
        totalPages: Math.ceil(totalSales / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get sales by branch with pagination
export async function getSalesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalSales] = await Promise.all([
      Sale.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Sale.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalSales,
        totalPages: Math.ceil(totalSales / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get sale by ID
export async function getSaleById(req, res) {
  const id = req.params.id;
  try {
    const result = await Sale.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new sale
export async function createSale(req, res) {
  try {
    const saleData = req.body;
    const result = await Sale.create(saleData);
    res.status(201).json(result);
  } catch (err) {
   
    if (err.code === 11000) {
      return res.status(400).json({ error: "Invoice number already exists. Please use a unique invoice number." });
    }
  
    res.status(400).send({ error: err.message });
  }
}

// Update a sale by ID
export async function updateSale(req, res) {
  const id = req.params.id;
  const saleData = req.body;
  try {
    const result = await Sale.findByIdAndUpdate(id, saleData, {
      new: true, 
      runValidators: true, 
    });
    
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (err) {
    // Handle MongoDB duplicate key error on update
    if (err.code === 11000) {
      return res.status(400).json({ error: "Invoice number already exists. Please use a unique invoice number." });
    }
    res.status(400).send({ error: err.message });
  }
}

// Remove a sale by ID
export async function removeSale(req, res) {
  const id = req.params.id;
  try {
    const result = await Sale.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Sale deleted successfully" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}