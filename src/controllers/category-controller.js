import { categoryService } from "../services/category-service.js";

class CategoryContoller {
  async createCategory(req, res, next) {
    try {
      const category = req.body;
      const createdNewCategory = await categoryService.createCategory(category);
      return res.status(200).json(createdNewCategory);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryList(req, res, next) {
    try {
      const categoryList = await categoryService.getCategoryList();
      return res.status(200).json(categoryList);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const Category = await categoryService.getCategoryById(categoryId);

      return res.status(200).json(Category);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryByName(req, res, next) {
    const name = req.query.name;

    try {
      const Category = await categoryService.getCategoryByName(name);
      res.status(200).json(Category);
    } catch (e) {
      next(e);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const updateCategory = req.body;
      const updatedCategory = await categoryService.updateCategory(categoryId, updateCategory);

      return res.status(200).json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      await categoryService.deleteCategory(categoryId);

      res.status(200).json(`카테고리 삭제 완료(ID : ${categoryId})`);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryContoller();
export { categoryController };
