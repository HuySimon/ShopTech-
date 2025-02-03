const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function updateProduct(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.json({
      data: updateProduct,
      message: "Product Updated",
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

module.exports = updateProduct;
