import { userService } from '../services/user-service.js';

export default {
  async createUser(req, res, next) {
    try {
      const { userId, name, password, phone, birthdate, address } = req.body;
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
      const createdUser = await userService.createUser(userInfo);
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const foundUser = await userService.getUser(userId);
      res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const updatedUser = await userService.updateUser(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userId;
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
      const updatedUser = await userService.updateUser(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async deleteAdminUser(req, res, next) {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      res.status(204).end();
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
