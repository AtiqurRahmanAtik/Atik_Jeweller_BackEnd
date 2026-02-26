import ProductCategory from "./ProductCategory.model.js";

export async function getAllProductCategories(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalCategories] = await Promise.all([
      ProductCategory.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      ProductCategory.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getProductCategoriesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalCategories] = await Promise.all([
      ProductCategory.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ProductCategory.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get product category by ID
export async function getProductCategoryById(req, res) {
  const id = req.params.id;
  try {
    const result = await ProductCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new product category
export async function createProductCategory(req, res) {
  try {
    const productCategoryData = req.body;
    const result = await ProductCategory.create(productCategoryData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a product category by ID
export async function updateProductCategory(req, res) {
  const id = req.params.id;
  const productCategoryData = req.body;
  try {
    const result = await ProductCategory.findByIdAndUpdate(id, productCategoryData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a product category by ID
export async function removeProductCategory(req, res) {
  const id = req.params.id;
  try {
    const result = await ProductCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Product category deleted successfully" });
    } else {
      res.status(404).json({ message: "Product category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}