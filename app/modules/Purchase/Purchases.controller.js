import Purchase from "./Purchases.model.js";

export async function getAllPurchases(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPurchases] = await Promise.all([
      Purchase.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Purchase.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPurchases,
        totalPages: Math.ceil(totalPurchases / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPurchasesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPurchases] = await Promise.all([
      Purchase.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Purchase.countDocuments({ branch })
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPurchases,
        totalPages: Math.ceil(totalPurchases / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get purchase by ID
export async function getPurchaseById(req, res) {
  const id = req.params.id;
  try {
    const result = await Purchase.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new purchase
export async function createPurchase(req, res) {
  try {
    const purchaseData = req.body;
    const result = await Purchase.create(purchaseData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a purchase by ID
export async function updatePurchase(req, res) {
  const id = req.params.id;
  const purchaseData = req.body;
  try {
    const result = await Purchase.findByIdAndUpdate(id, purchaseData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Add a product to an existing purchase
export async function addProductToPurchase(req, res) {
  const id = req.params.id;
  const productData = req.body;
  try {
    const result = await Purchase.findByIdAndUpdate(
      id,
      { $push: { products: productData } },
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a purchase by ID
export async function removePurchase(req, res) {
  const id = req.params.id;
  try {
    const result = await Purchase.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Purchase deleted successfully" });
    } else {
      res.status(404).json({ message: "Purchase not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}