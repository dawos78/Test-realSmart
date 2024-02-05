const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const validator = require("validator");

module.exports = class UserService {
  static async getAllUser() {
    try {
      const allUser = await User.find();
      return allUser;
    } catch (error) {
      return {
        status: 500,
        message: `Could not fetch users: ${error}`,
      };
    }
  }

  static async login(identifier, password, rememberMe) {
    try {
      if (!identifier || !password) {
        return {
          status: 400,
          message: "Please provide email/phone and password!",
        };
      }

      const isEmail = validator.isEmail(identifier);
      const query = isEmail
        ? { email: identifier }
        : { phoneNumber: identifier };

      const UserLogin = await User.findOne(query).select("+password");
      console.log(UserLogin);

      if (
        !UserLogin ||
        !(await UserLogin.correctPassword(password, UserLogin.password))
      ) {
        return { status: 401, message: "Incorrect email/phone or password" };
      }

      const accessData = {
        id: UserLogin._id,
        username: UserLogin.username,
        email: UserLogin.email,
        phoneNumber: UserLogin.phoneNumber,
      };

      const tokenDuration = rememberMe ? "7d" : "12h";
      const token = jwt.sign(accessData, process.env.jwtSecretKey, {
        expiresIn: tokenDuration,
      });

      return {
        status: 200,
        tokenType: "Bearer",
        token,
        data: UserLogin,
      };
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      return {
        status: 500,
        message: `Error logging in User: ${error}`,
      };
    }
  }

  static async createUsers(data) {
    try {
      const newUser = await User.create(data);

      const accessData = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      };

      return {
        status: 201,
        data: accessData,
      };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      return {
        status: 500,
        message: `Error creating user: ${error}`,
      };
    }
  }

  static async changePassword(UserId, data) {
    try {
      const user = await User.findById(UserId);
      if (!user) {
        return { status: 400, message: "User is invalid" };
      }

      if (data.password !== data.passwordConfirm) {
        return { status: 400, message: "Passwords do not match" };
      }

      user.password = data.password;
      await user.save();

      const tokenJWT = jwt.sign({ id: user.id }, process.env.jwtSecretKey, {
        expiresIn: "12h",
      });

      return {
        status: 200,
        tokenType: "Bearer",
        token: tokenJWT,
        data: {
          id: user._id,
          username: user.username,
          phoneNumber: user.phoneNumber,
          email: user.email,
        },
      };
    } catch (error) {
      console.error(`Error changing password: ${error}`);
      return {
        status: 500,
        message: `Error changing password: ${error}`,
      };
    }
  }

  static async updateUserService(userId, updateFields) {
    try {
      const updateResponse = await User.updateOne(
        {
          _id: userId,
        },
        {
          $set: updateFields,
        }
      );
      return updateResponse;
    } catch (error) {
      console.error(`Could not update user: ${error}`);
      throw error;
    }
  }

  static async deleteUserService(userId) {
    try {
      const deleted = await User.deleteOne({ where: { id: userId } });

      if (deleted) {
        return { status: 200, message: "User deleted successfully" };
      }

      throw new Error("User not found");
    } catch (error) {
      console.error(`Could not delete user: ${error}`);
      return {
        status: 500,
        message: `Error deleting user: ${error}`,
      };
    }
  }
};
