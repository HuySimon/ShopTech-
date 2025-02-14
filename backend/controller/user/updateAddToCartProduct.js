const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModels");

async function updateAddToCartProduct(req, res) {
  try {
    const currentUserId = req?.userId;
    const addToCartProductId = req?.body._id;

    const qty = req?.body.quantity;

    const updateProduct = await addToCartModel.updateOne(addToCartProductId, {
      ...(qty && { quantity: qty }),
    });

    res.json({
      message: "Product Updated",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateAddToCartProduct;
