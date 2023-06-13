import { nationModel } from '../db/models/nation-model.js';

class NationService{
  async createNation(nationInfo){
    const createNation = await nationModel.create(nationInfo);
    return createNation;
  }
  async getNationList(){
    const nationList = await nationModel.findAll();
    return nationList;
  }
  async getNationById(nationId){
    const nation = await nationModel.findById(nationId);
    return nation;
  }
  async updateNation(nationId, nationInfo){
    const updateNation = await nationModel.update(nationId, nationInfo);
    return updateNation;
  }
  async deleteNation(nationId) {
    await nationModel.delete(nationId);
  }
}
const nationService = new NationService();

export { nationService };
