import { productModel }  from "../db/models/product-model.js";
import { categoryModel }  from "../db/models/category-model.js";

class ProductService {
  async createProduct(productInfo) {
    const createdNewProduct = await productModel.create(productInfo);
    return createdNewProduct;
  }

  async getProduct(productId) {
    const product = await productModel.findById(productId);
    return product;
  }

  async getProductList(pidArr) {
    if (!pidArr) {
      const productList = await productModel.findAll();
      return productList;
    } else {
      const productList = await productModel.findByIds(pidArr);
      return productList;
    }
  }
  async getProductsByCategoryTitle(categoryTitle) {
    const category = await categoryModel.findByTitle(categoryTitle);
    const products = await productModel.findAllByCategoryId(category);

    return products;
  }
 



  async updateProduct(productId, toUpdate) {
    const updatedProduct = await productModel.update(productId, toUpdate);
    return updatedProduct;
  }

  async deleteProduct(productId) {
    const { removeCount } = await productModel.delete(productId);

    if(removeCount === 0 ){
      throw new Error(`${productId} 제품 삭제를 실패했습니다.`);
    }
    return {result : "success"};
  }

  async searchProduct(searchBy) {
    const productList = await productModel.search(searchBy);
    return productList;
  }
}

const productService = new ProductService();

export { productService };
