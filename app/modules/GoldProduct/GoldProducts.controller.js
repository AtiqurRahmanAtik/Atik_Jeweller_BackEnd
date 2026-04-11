import GoldProduct from "./GoldProducts.model.js";

export async function getAllGoldProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // ✅ Category filter (Fix: Case-insensitive, ignores "All")
    if (req.query.category && req.query.category.toLowerCase() !== "all") {
      query.category = {
        $regex: `^${req.query.category.trim()}$`,
        $options: "i",
      };
    }

    // ✅ Search filter
    if (req.query.search) {
      query.productName = {
        $regex: req.query.search.trim(),
        $options: "i",
      };
    }

    const [result, totalGoldProducts] = await Promise.all([
      GoldProduct.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),

      GoldProduct.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalGoldProducts,
        totalPages: Math.ceil(totalGoldProducts / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getGoldProductsByBranch(req, res) {
  try {
    const branch = req.params.branch;

    if (!branch) {
      return res.status(400).json({ message: "Branch is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { branch };

    // ✅ Category filter (Fix: Case-insensitive, ignores "All")
    if (req.query.category && req.query.category.toLowerCase() !== "all") {
      query.category = {
        $regex: `^${req.query.category.trim()}$`,
        $options: "i",
      };
    }

    // ✅ Search filter (better version)
    if (req.query.search) {
      query.productName = {
        $regex: req.query.search.trim(),
        $options: "i",
      };
    }

    const [result, totalGoldProducts] = await Promise.all([
      GoldProduct.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),

      GoldProduct.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalGoldProducts,
        totalPages: Math.ceil(totalGoldProducts / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
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