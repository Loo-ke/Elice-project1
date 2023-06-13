import { nationService } from "../services/nation-service.js";

class NationController{
  async createNation(req, res, next) {
    try {
      const nation = req.body;
      const createdNewNation = await nationService.createNation(nation);
      return res.status(200).json(createdNewNation);
    } catch (error) {
      next(error);
    }
  }
  async getNationList(req, res, next) {
    try {
      const nationList = await nationService.getNationList();
      return res.status(200).json(nationList);
    } catch (e) {
      next(e);
    }
  }

  async getNationById(req, res, next) {
    try {
      const nationId = req.params.nationId;
      const Nation = await nationService.getNationById(nationId);

      return res.status(200).json(Nation);
    } catch (e) {
      next(e);
    }
  }
  async updateNation(req, res, next) {
    try {
      const nationId = req.params.nationId;
      const updateNation = req.body;
      const updatedNation = await nationService.updateNation(nationId, updateNation);

      return res.status(200).json(updatedNation);
    } catch (e) {
      next(e);
    }
  }

  async deleteNation(req, res, next) {
    try {
      const nationId = req.params.nationId;
      await nationService.deleteNation(nationId);

      res.status(200).json(`카테고리 삭제 완료(ID : ${nationId})`);
    } catch (e) {
      next(e);
    }
  }


}

const nationController = new NationController();
export { nationController };
