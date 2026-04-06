import Order from "./Orders.model.js";

export async function getAllOrders(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalOrders] = await Promise.all([
      Order.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Order.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getOrdersByBranch(req, res) {
  const branch = req.params.branch;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, totalOrders] = await Promise.all([
      Order.find({ branch }).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Order.countDocuments({ branch }) 
    ]);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        totalItems: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get order by ID
export async function getOrderById(req, res) {
  const id = req.params.id;
  try {
    const result = await Order.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new order
export async function createOrder(req, res) {
  try {
    const orderData = req.body;
    const result = await Order.create(orderData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an order by ID
export async function updateOrder(req, res) {
  const id = req.params.id;
  const orderData = req.body;
  try {
    const result = await Order.findByIdAndUpdate(id, orderData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an order by ID
export async function removeOrder(req, res) {
  const id = req.params.id;
  try {
    const result = await Order.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}