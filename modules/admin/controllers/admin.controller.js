"use strict";
let Validator = require('validatorjs');
let AdminService = require("../services/admin.services");
let adminService = new AdminService();
let adminFormatter = new (require('../formatters/admin.formatter'))();
let adminValidator = new (require("../validators/admin.validators"));
let responseMessages = require("../response/admin.response");
module.exports = class AdminController {
    constructor() { }
    /**
     *
     * @param {*} req
     * @param {*} res
     * @returns {Promise<void>}
     */
    async login(req, res) {
        // returnResponse variable use for returning data to client request
        let returnResponse = {}
        // Format request data
        let form_data = adminFormatter.login(req);
        // Getting voucher Validator
        let rules = adminValidator.login();
        // Check and store validation data
        let validation = new Validator(form_data, rules);
        // Check validation is passed or failed
        if (validation.passes() && !validation.fails()) {
            /**
             * Validation success
             */
            returnResponse = await adminService.login(form_data);
        } else {
            // store return code and message in returnResponse variable
            returnResponse = responseMessages.validation_error;
            // Getting errors of validation and store in returnResponse variable
            returnResponse.errors = validation.errors.errors;
        }
        // return response to client request
        return res.json(returnResponse);
    }

    async addStudent(req, res) {
        // returnResponse variable use for returning data to client request
        let returnResponse = {}
        // Format request data
        let form_data = adminFormatter.addStudent(req);
        // Getting voucher Validator
        let rules = adminValidator.addStudent();
        // Check and store validation data
        let validation = new Validator(form_data, rules);
        // Check validation is passed or failed
        if (validation.passes() && !validation.fails()) {
            /**
             * Validation success
             */
            returnResponse = await adminService.addStudent(form_data);
        } else {
            // store return code and message in returnResponse variable
            returnResponse = responseMessages.validation_error;
            // Getting errors of validation and store in returnResponse variable
            returnResponse.errors = validation.errors.errors;
        }
        // return response to client request
        return res.json(returnResponse);
    }

    async studentList(req, res) {
        // returnResponse variable use for returning data to client request
        let returnResponse = {}
        // Format request data
        let form_data = adminFormatter.studentList(req);
        // Getting voucher Validator
        let rules = adminValidator.studentList();
        // Check and store validation data
        let validation = new Validator(form_data, rules);
        // Check validation is passed or failed
        if (validation.passes() && !validation.fails()) {
            /**
             * Validation success
             */
            returnResponse = await adminService.studentList(form_data);
        } else {
            // store return code and message in returnResponse variable
            returnResponse = responseMessages.validation_error;
            // Getting errors of validation and store in returnResponse variable
            returnResponse.errors = validation.errors.errors;
        }
        // return response to client request
        return res.json(returnResponse);
    }

    async getStudentById(req, res) {
        // returnResponse variable use for returning data to client request
        let returnResponse = {}
        // Format request data
        let form_data = adminFormatter.getStudentById(req);
        // Getting voucher Validator
        let rules = adminValidator.getStudentById();
        // Check and store validation data
        let validation = new Validator(form_data, rules);
        // Check validation is passed or failed
        if (validation.passes() && !validation.fails()) {
            /**
             * Validation success
             */
            returnResponse = await adminService.getStudentById(form_data);
        } else {
            // store return code and message in returnResponse variable
            returnResponse = responseMessages.validation_error;
            // Getting errors of validation and store in returnResponse variable
            returnResponse.errors = validation.errors.errors;
        }
        // return response to client request
        return res.json(returnResponse);
    }

    async editStudentDetail(req,res){
        let returnResponse = {}
        // Format request data
        let form_data = adminFormatter.editStudentDetail(req);
        // Getting voucher Validator
        let rules = adminValidator.getStudentById();
        // Check and store validation data
        let validation = new Validator(form_data, rules);
        // Check validation is passed or failed
        if (validation.passes() && !validation.fails()) {
            /**
             * Validation success
             */
            returnResponse = await adminService.editStudentDetail(form_data);
        } else {
            // store return code and message in returnResponse variable
            returnResponse = responseMessages.validation_error;
            // Getting errors of validation and store in returnResponse variable
            returnResponse.errors = validation.errors.errors;
        }
        // return response to client request
        return res.json(returnResponse);

    }


}
