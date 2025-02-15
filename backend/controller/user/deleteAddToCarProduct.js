const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModels");

async function deleteAddToCartProduct(req, res) {
  try {
    const currentUserId = req?.userId;
    const addToCartProductId = req?.body._id;

    const deleteProduct = await addToCartModel.deleteOne({_id: addToCartProductId});

    res.json({
      message: "Product Deleted From Cart",
      data: deleteProduct,
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

module.exports = deleteAddToCartProduct;
