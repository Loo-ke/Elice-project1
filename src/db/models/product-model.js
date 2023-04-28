import { model } from 'mongoose';
import { ProductSchema } from "../schemas/product-schema.js";

const Product = model('Product', ProductSchema);

class ProductModel {
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }

  async findAllByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });
    return products;
  }
  //  // 카테고리에 따른 상품 조회
  //  async findByCategory(category) {
  //   const products = await Product.find({ category: category });
  //   return products;
  // }


  async findById(pId) {
    const product = await Product.findOne({ _id: pId });//_id로 변경
    return product;
  }
  async findByIds(pidArr){
    try {
      const productList = new Array();

      for (const pid of pidArr) {
        const product = await Product.findOne({ _id: pid }).populate(
          "category"
        );
        if (product) {
          productList.push(product);
        }
      }
      return productList;
    } catch (err) {
      const error = new Error("ID기반 상품 리스트 검색에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }

  }
  
  async findAll() {
    try {
      const productList = await Product.find({});
      return productList;
    } catch (err) {
      const error = new Error("상품 수정에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }


  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }

  async update(pId, update) {// _id로 변경
    const filter = { _id: pId };
    const option = { returnOriginal: true };
    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async delete(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  }
}

const productModel = new ProductModel();
export { productModel };
