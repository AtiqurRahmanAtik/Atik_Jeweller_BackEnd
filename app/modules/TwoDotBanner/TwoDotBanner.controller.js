import TwoDotBanner from "./TwoDotBanner.model.js";

export async function getAllTwoDotBanners(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBanners] = await Promise.all([
      TwoDotBanner.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      TwoDotBanner.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBanners,
        totalPages: Math.ceil(totalBanners / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTwoDotBannersByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalBanners] = await Promise.all([
      TwoDotBanner.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      TwoDotBanner.countDocuments({ branch })
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalBanners,
        totalPages: Math.ceil(totalBanners / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getTwoDotBannerById(req, res) {
  const id = req.params.id;
  try {
    const result = await TwoDotBanner.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "TwoDotBanner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createTwoDotBanner(req, res) {
  try {
    const bannerData = req.body;
    const result = await TwoDotBanner.create(bannerData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateTwoDotBanner(req, res) {
  const id = req.params.id;
  const bannerData = req.body;
  try {
    const result = await TwoDotBanner.findByIdAndUpdate(id, bannerData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "TwoDotBanner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function removeTwoDotBanner(req, res) {
  const id = req.params.id;
  try {
    const result = await TwoDotBanner.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "TwoDotBanner deleted successfully" });
    } else {
      res.status(404).json({ message: "TwoDotBanner not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}