const productModel = require("../../models/productModel");

async function filterProduct(req, res) {
  try {
    const categoryList = req?.body?.category || [];
    const product = await productModel.find({
      category: { "$in": categoryList },
    });

    res.json({
      message: "product",
      data: product,
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

module.exports = filterProduct;
