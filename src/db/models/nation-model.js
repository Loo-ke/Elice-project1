import { model } from "mongoose";
import { NationSchema } from "../schemas/nation-schema.js";

const Nation = model("Nation", NationSchema);

class NationModel {
  async create(category) {
    try {
      const createdNewNation = await Nation.create(category);
      return createdNewNation;
    } catch (err) {
      const error = new Error("새 카테고리 생성에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
  async findById(nationId) {
    try {
      const nation = await Nation.findOne({ _id: nationId });
      return nation;
    } catch (err) {
      const error = new Error(
        "ID 기반으로 Nation에 대한 정보를 불러오지 못하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }
  async findAll() {
    try {
      const nationList = await Nation.find({});
      return nationList;
    } catch (err) {
      const error = new Error(
        "국가 전체리스트를 불러오는데에 실패하였습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }
  async update(nationId, nationInfo) {
    const filter = { _id: nationId };
    const option = { returnOriginal: false };
    try {
      const updatedNation = await Nation.findOneAndUpdate(
        filter,
        nationInfo,
        option
      );
      return updatedNation;
    } catch (err) {
      const error = new Error("naiton 수정에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  async delete(NationId) {
    try {
      await Nation.deleteOne({ _id: NationId });
    } catch (err) {
      const error = new Error("nation 삭제에 실패하였습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}

const nationModel = new NationModel();

export { nationModel };
