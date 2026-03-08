import MetalType from "./MetalTypes.model.js";

export async function getAllMetalTypes(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalMetalTypes] = await Promise.all([
      MetalType.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      MetalType.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalMetalTypes,
        totalPages: Math.ceil(totalMetalTypes / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getMetalTypesByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalMetalTypes] = await Promise.all([
      MetalType.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      MetalType.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalMetalTypes,
        totalPages: Math.ceil(totalMetalTypes / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get metal type by ID
export async function getMetalTypeById(req, res) {
  const id = req.params.id;
  try {
    const result = await MetalType.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Metal Type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new metal type
export async function createMetalType(req, res) {
  try {

    console.log("BODY:", req.body);

    const metalTypeData = req.body;

    const result = await MetalType.create(metalTypeData);

    res.status(201).json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
}

// Update a metal type by ID
export async function updateMetalType(req, res) {
  const id = req.params.id;
  const metalTypeData = req.body;
  try {
    const result = await MetalType.findByIdAndUpdate(id, metalTypeData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Metal Type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a metal type by ID
export async function removeMetalType(req, res) {
  const id = req.params.id;
  try {
    const result = await MetalType.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Metal Type deleted successfully" });
    } else {
      res.status(404).json({ message: "Metal Type not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}