import { categoryModel } from "../db/models/category-model.js";

class CategoryService {
  async createCategory(categoryInfo) {
    const name = categoryInfo; 
    const createdNewCategory = await categoryModel.create(categoryInfo);
    return createdNewCategory;
  }

  async getCategoryById(cid) {
    const category = await categoryModel.findById(cid);
    return category;
  }

  async getCategoryByName(name) {
    const category = await categoryModel.findByName(name);
    return category;
  }

  async getCategoryList() {
    const categoryList = await categoryModel.findAll();
    return categoryList;
  }

  async updateCategory(categoryId, categoryInfo) {
    const updatedcategory = await categoryModel.update(categoryId, categoryInfo);
    return updatedcategory;
  }

  async deleteCategory(cid) {
    await categoryModel.delete(cid);
  }
}

const categoryService = new CategoryService();

export { categoryService };
