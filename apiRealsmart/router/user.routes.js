const express = require('express');
const userCtrl = require("../controllers/user.controller");
const authenticateToken = require('../helper/authenticateToken');

const router = express.Router();


router.get('/getAll', authenticateToken, userCtrl.apiGetAllUser);
router.post("/login", userCtrl.apiLogin);
router.post("/createUser", userCtrl.apiCreateUser);
router.post("/changePassword/:id", userCtrl.apiChangePasswordUser);
router.put("/updateUser/:id", userCtrl.apiUpdateUser);
router.delete("/deleteUser/:id", userCtrl.apiDeleteUser);

module.exports = router;