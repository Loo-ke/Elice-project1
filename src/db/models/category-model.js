import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema.js";

const Category = model("Category", CategorySchema);

class CategoryModel {
  async findById(cid) {
    try {
      const category = await Category.findOne({ _id: cid });
      return category;
    } catch (err) {
      const error = new Error(
        "ID 기반으로 Catgory에 대한 정보를 불러오지 못하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async findByTitle(title) {
    const category = await Category.findOne({ title });
    return category;
  }


  // async findByName(name) {
  //   try {
  //     const category = await Category.findOne({ name });
  //     return category;
  //   } catch (err) {
  //     const error = new Error(
  //       "이름 기반으로 카테고리 정보를 불러들이는데 실패하였습니다."
  //     );
  //     error.statusCode = 400;
  //     throw error;
  //   }
  // }

  async findAll() {
    try {
      const categoryList = await Category.find({});
      return categoryList;
    } catch (err) {
      const error = new Error(
        "카레고리 전체리스트를 불러오는데에 실패하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  async create(category) {
    try {
      const createdNewCategory = await Category.create(category);
      return createdNewCategory;
    } catch (err) {
      const error = new Error("새 카테고리 생성에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async update(categoryId, categoryInfo) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: true };
  
    const updatedCategory = await Category.findOneAndUpdate(filter, categoryInfo,option);
    return updatedCategory;
    
  }

  async delete(cid) {
    try {
      await Category.deleteOne({ _id: cid });
    } catch (err) {
      const error = new Error("카테고리 삭제에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
