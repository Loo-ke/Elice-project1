import { userService } from '../services/user-service.js';
export default {
  async createUser(req, res, next) {
    try {
      const { userId, name, password, phone, birthdate, address ={} } = req.body;
      const { postalCode, address1, address2 } = address;
      const userInfo = {
        userId,
        name,
        password,
        phone,
        birthdate,
        address: {
          postalCode,
          address1,
          address2,
        },
      };
      const allUsers = await userService.getAllUsers();

    // 첫 번째 사용자일 경우 isAdmin 값을 true로 설정
    if (allUsers.length === 0) {
      userInfo.isAdmin = true;
    }
      const createdUser = await userService.createUser(userInfo);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {


    try {
      const userId = req.params.userId;
      if (!req.userId) {
        return res.status(401).send('Unauthorized');
      } // 로그인하지 않은 사용자
  
      if (req.userId !== userId) {
        return res.status(403).send('Forbidden');
      } // 로그인한 사용자와 요청한 사용자가 다른 경우
  
      const foundUser = await userService.getUser(userId);
      res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const userId = req.params.userId;
      if (req.userId !== userId) {
        res.status(403).json({
          result: "forbidden-approach",
          reason: "수정할 권한이 없습니다.",
        });
        return;
      }
      const updatedUser = await userService.updateUser(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userId;
      if (req.userId !== userId) {
        res.status(403).json({
          result: "forbidden-approach",
          reason: "자신의 계정만 삭제할 수 있습니다.",
        });
        return;
      }
      await userService.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async getAdminUser(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  },

  async updateAdminUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const { isAdmin } = req.body;
      let updatedUser;
      
      if (isAdmin) {
        updatedUser = await userService.setAdmin(userId);
      } else {
        updatedUser = await userService.setUser(userId);
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  


adminOnly: [
  '/admin/members',
  '/admin/members/:userId'
],
isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}
};
