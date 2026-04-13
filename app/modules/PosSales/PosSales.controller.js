import PosSale from "./PosSales.model.js";

export async function getAllPosSales(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPosSales] = await Promise.all([
      PosSale.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      PosSale.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPosSales,
        totalPages: Math.ceil(totalPosSales / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPosSalesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPosSales] = await Promise.all([
      PosSale.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      PosSale.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPosSales,
        totalPages: Math.ceil(totalPosSales / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get PosSale by ID
export async function getPosSaleById(req, res) {
  const id = req.params.id;
  try {
    const result = await PosSale.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "PosSale not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new PosSale
export async function createPosSale(req, res) {
  try {
    const posSaleData = req.body;
    const result = await PosSale.create(posSaleData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a PosSale by ID
export async function updatePosSale(req, res) {
  const id = req.params.id;
  const posSaleData = req.body;
  try {
    const result = await PosSale.findByIdAndUpdate(id, posSaleData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "PosSale not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a PosSale by ID
export async function removePosSale(req, res) {
  const id = req.params.id;
  try {
    const result = await PosSale.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "PosSale deleted successfully" });
    } else {
      res.status(404).json({ message: "PosSale not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}