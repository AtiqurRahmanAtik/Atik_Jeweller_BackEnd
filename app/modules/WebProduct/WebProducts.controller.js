import WebProduct from "./WebProducts.model.js";

export async function getAllWebProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalWebProducts] = await Promise.all([
      WebProduct.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      WebProduct.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalWebProducts,
        totalPages: Math.ceil(totalWebProducts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}



export async function getWebProductsByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalWebProducts] = await Promise.all([
      WebProduct.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      WebProduct.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalWebProducts,
        totalPages: Math.ceil(totalWebProducts / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get web product by ID
export async function getWebProductById(req, res) {
  const id = req.params.id;
  try {
    const result = await WebProduct.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "WebProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}


// Create a new web product
export async function createWebProduct(req, res) {
  try {
    const webProductData = req.body;
    const result = await WebProduct.create(webProductData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a web product by ID
export async function updateWebProduct(req, res) {
  const id = req.params.id;
  const webProductData = req.body;
  try {
    const result = await WebProduct.findByIdAndUpdate(id, webProductData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "WebProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a web product by ID
export async function removeWebProduct(req, res) {
  const id = req.params.id;
  try {
    const result = await WebProduct.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "WebProduct deleted successfully" });
    } else {
      res.status(404).json({ message: "WebProduct not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}