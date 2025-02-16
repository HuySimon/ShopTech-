const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function searchProduct(req, res) {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      data: product,
      message: "Search Product List",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      messsage: err.messsage || err,
      error: true,
      success: false,
    });
  }
}

module.exports = searchProduct;
