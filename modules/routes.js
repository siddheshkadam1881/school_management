const express = require('express');
var router = express.Router();
var path = require('path');
const AdminController = require('./admin/controllers/admin.controller');
let adminController = new AdminController();

router.post('/admin/login', adminController.login)
router.post('/admin/addStudent', adminController.addStudent)


module.exports = router;