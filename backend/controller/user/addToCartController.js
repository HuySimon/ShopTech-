const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModels");

async function addToCartController(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in Add to cart ",
        success: false,
        error: true,
      });
    }

    const payLoad = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payLoad);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product Added",
      data: saveProduct,
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

module.exports = addToCartController;
