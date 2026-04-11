import WebProduct from "./WebProducts.model.js";

// --- EXISTING CONTROLLERS ---

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

export async function createWebProduct(req, res) {
  try {
    const webProductData = req.body;
    const result = await WebProduct.create(webProductData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
}

export async function updateWebProduct(req, res) {
  const id = req.params.id;
  const webProductData = req.body;
  try {
    const result = await WebProduct.findByIdAndUpdate(id, webProductData, {
      new: true,
      runValidators: true, 
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "WebProduct not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
}

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

// --- NEW SEARCH CONTROLLER ---

export async function searchWebProducts(req, res) {
  try {
    const searchTerm = req.query.q || ""; // Extract search query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Define search conditions using $or to search across multiple fields
    // $options: "i" makes the search case-insensitive
    const searchCriteria = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { tag: { $regex: searchTerm, $options: "i" } }
      ]
    };

    // Execute search and get total count simultaneously for pagination
    const [result, totalWebProducts] = await Promise.all([
      WebProduct.find(searchCriteria).skip(skip).limit(limit).sort({ createdAt: -1 }),
      WebProduct.countDocuments(searchCriteria)
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