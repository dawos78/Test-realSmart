const UserService = require("../services/user");
module.exports = class User {
  static async apiLogin(req, res) {
    const { identifier, password } = req.body;
    const rememberMe = req.body.rememberMe ? req.body.rememberMe : false;
    try {
      const users = await UserService.login(identifier, password, rememberMe);
      res.status(users.status).json(users);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  static async apiGetAllUser(req, res) {
    try {
      const users = await UserService.getAllUser();
      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "There are no users published yet!" });
      }
      return res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiCreateUser(req, res) {
    try {
      const createUser = await UserService.createUsers(req.body);
      res.status(createUser.status).json(createUser);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiChangePasswordUser(req, res) {
    try {
      const userId = req.params.id;
      const data = {
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };
      const createUser = await UserService.changePassword(userId, data);
      res.status(200).json(createUser);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const updateFields = {
        username: req.body.username,
        email: req.body.email,
      };

      await UserService.updateUserService(userId, updateFields);

      const response = {
        success: true,
        message: "User updated successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const userId = req.params.id;

      await UserService.deleteUserService(userId);

      const response = {
        success: true,
        message: "User deleted successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }
};
