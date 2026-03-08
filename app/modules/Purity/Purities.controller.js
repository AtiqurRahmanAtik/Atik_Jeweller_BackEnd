import Purity from "./Purities.model.js";

export async function getAllPurities(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPurities] = await Promise.all([
      Purity.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Purity.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPurities,
        totalPages: Math.ceil(totalPurities / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getPuritiesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalPurities] = await Promise.all([
      Purity.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Purity.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalPurities,
        totalPages: Math.ceil(totalPurities / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get purity by ID
export async function getPurityById(req, res) {
  const id = req.params.id;
  try {
    const result = await Purity.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Purity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new purity
export async function createPurity(req, res) {
  try {
    const purityData = req.body;
    const result = await Purity.create(purityData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a purity by ID
export async function updatePurity(req, res) {
  const id = req.params.id;
  const purityData = req.body;
  try {
    const result = await Purity.findByIdAndUpdate(id, purityData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Purity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a purity by ID
export async function removePurity(req, res) {
  const id = req.params.id;
  try {
    const result = await Purity.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Purity deleted successfully" });
    } else {
      res.status(404).json({ message: "Purity not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}