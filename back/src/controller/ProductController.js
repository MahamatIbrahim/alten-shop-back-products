import Product, {
  countAllProducts,
  createProduct,
  findAllProducts,
  deleteProduct,
  getProductByid,
  updateProduct,
} from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const total = await countAllProducts();
    const product = await findAllProducts();
    res.status(product.success ? 200 : 404).json({ data: product.data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const prductId = req.params.id;
    const product = await getProductByid(prductId);
    res.status(product.success ? 200 : 404).json({ data: product.data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addProducts = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await createProduct(newProduct);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProductsById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = updateProduct(productId, req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await deleteProduct(productId);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
