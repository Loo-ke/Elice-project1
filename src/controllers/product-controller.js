import { productService } from "../services/product-service.js";

class ProductController {
  async  createProduct(req, res, next) {
    try {
      const product = req.body;
      const createdProduct = await productService.createProduct(product);
  
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  };
  
  async getProductList(req, res, next){
    try {
      const productArr = req.params.productId;
      const foundProduct = await productService.getProductList(productArr);
  
      res.status(200).json(foundProduct);
    } catch (error) {
      next(error);
    }
  };

  async getProduct(req, res, next){
    try {
      const productArr = req.params.productId;
      const foundProduct = await productService.getProductList(productArr);
  
      res.status(200).json(foundProduct);
    } catch (error) {
      next(error);
    }
  };

  async getProduct(req, res, next){
    try {
      const productId = req.params.productId;
      const foundProduct = await productService.getProduct(productId);
  
      res.status(200).json(foundProduct);
    } catch (error) {
      next(error);
    }
  };


  async updateProduct(req, res, next){
    try {
      const productId = req.params.productId;
      const updatedInfo = req.body;
      const updatedProduct = await productService.updateProduct(productId, updatedInfo);
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };
  async deleteProduct (req, res, next){
    try {
      const productId = req.params.productId;
      await productService.deleteProduct(productId);
  
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

};
const productController = new ProductController();
export { productController };


// const createProduct = async (req, res, next) => {
//   try {
//     const product = req.body;
//     const createdProduct = await productService.createProduct(product);

//     res.status(201).json(createdProduct);
//   } catch (error) {
//     next(error);
//   }
// };

// const getProduct = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const foundProduct = await productService.getProductById(productId);

//     res.status(200).json(foundProduct);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateProduct = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const updatedInfo = req.body;
//     const updatedProduct = await productService.updateProduct(productId, updatedInfo);

//     res.status(200).json(updateProduct);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteProduct = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     await productService.deleteProduct(productId);

//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

// export { createProduct, getProduct, updateProduct, deleteProduct };
