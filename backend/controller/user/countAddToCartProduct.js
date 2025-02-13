const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModels");


async function countAddToCartProduct(req, res) {
  try {
    const userId = req?.userId;

    const count = await addToCartModel.countDocuments({
      userId: userId,
    });

    res.json({
      message: "Ok",
      data: {
        count: count,
      },
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

module.exports = countAddToCartProduct;
