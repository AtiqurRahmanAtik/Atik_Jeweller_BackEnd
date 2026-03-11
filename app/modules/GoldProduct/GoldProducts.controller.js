import GoldProduct from "./GoldProducts.model.js";

export async function getAllGoldProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalGoldProducts] = await Promise.all([
      GoldProduct.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      GoldProduct.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalGoldProducts,
        totalPages: Math.ceil(totalGoldProducts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getGoldProductsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalGoldProducts] = await Promise.all([
      GoldProduct.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      GoldProduct.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalGoldProducts,
        totalPages: Math.ceil(totalGoldProducts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get gold product by ID
export async function getGoldProductById(req, res) {
  const id = req.params.id;
  try {
    const result = await GoldProduct.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "GoldProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new gold product
export async function createGoldProduct(req, res) {
  try {
    const goldProductData = req.body;
    const result = await GoldProduct.create(goldProductData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a gold product by ID
export async function updateGoldProduct(req, res) {
  const id = req.params.id;
  const goldProductData = req.body;
  try {
    const result = await GoldProduct.findByIdAndUpdate(id, goldProductData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "GoldProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a gold product by ID
export async function removeGoldProduct(req, res) {
  const id = req.params.id;
  try {
    const result = await GoldProduct.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "GoldProduct deleted successfully" });
    } else {
      res.status(404).json({ message: "GoldProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}