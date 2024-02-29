import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: Number,
    code: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    inventoryStatus: String,
    category: String,
    image: String,
    rating: Number, 
  });
  
  productSchema.pre('save', async function(next) {
    if (!this.id) {
        try {
            const lastProduct = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } }); 
            this.id = lastProduct ? lastProduct.id + 1 : 1000; 
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;


export const createProduct = async (body) => {
    try {
        const product = new Product(body);
        
        const response = await product.save();
        return { success: true, data: response };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateProduct = async (id,body) => {
    try {
        const product = await Product.findOneAndUpdate({id:id},body,{new:true});
        const response = await product.save();
        return { success: true, data: response };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteProduct = async (id) => {
    try {
        const ProdDelete = await Product.findOneAndDelete({id : id}); 

        if (!ProdDelete) {
            return { success: false, message: 'product not found' };
        }
        return { message: "Product deleted successfully" };
    } catch (error) {
        return { success: false, message: 'Error getting product: ' + error };
    }
}

export const getProductByid = async (id) => {
    try {
        const product = await Product.findOne({id:id});
        if (!product) {
            return { success: false, message: 'product not found' };
        }
        return { success: true, data: product };
    } catch (error) {
        return { success: false, message: 'Error getting product: ' + error };
    }
};



export const countAllProducts = async () => {
  try {
      const count = await Product.countDocuments();
      if (!count) {
          return { success: false, message: "can't count Products" };
      }
      return { success: true, data: count };
  } catch (error) {
      return { success: false, message: 'Error counting documents' + error };
  }
}

export const findAllProducts = async () => {
  try {
      const Products = await Product.find();
      if (!Products) {
          return { success: false, message: 'Products not found' };
      }
      return { success: true, data: Products };
  } catch (error) {
      return { success: false, message: 'Error finding Products:' + error };
  }
}

