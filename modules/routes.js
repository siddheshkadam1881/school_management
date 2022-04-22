const express = require('express');
var router = express.Router();
var path = require('path');
const AdminController = require('./admin/controllers/admin.controller');
let adminController = new AdminController();

router.post('/admin/login', adminController.login)
router.post('/admin/addStudent', adminController.addStudent)
router.post('/admin/studentList', adminController.studentList)
router.post('/admin/getStudentById', adminController.getStudentById)
router.post('/admin/editStudentDetail', adminController.editStudentDetail)
router.post('/admin/addWorkingDays', adminController.addWorkingDays)
router.post('/admin/getWorkingDays', adminController.getWorkingDays)
router.post('/admin/editWorkingDays', adminController.editWorkingDays)
// router.post('/admin/addStudent', adminController.editWorkingDays)
router.post('/admin/storeSalesIteam', adminController.storeSalesIteam)


module.exports = router;