let responseMessages = require("../response/admin.response");
const path = require("path");
const validator = require(path.join(global.appRoot + "/helper/client_api_validator.js"))
let adminModel = new (require("../model/admin.mysql"))();
var sha1 = require('sha1');
const moment = require('moment');
var parser = require('xml2json-light');

module.exports = class adminService {
    async login(form_data) {
        return adminModel.getAdmin(form_data)
            .then(async (users) => {
                if (users.length > 0) {
                    let email = sha1(form_data.email.toLowerCase());
                    let password = sha1(form_data.password)
                    if (email !== users[0].email) {
                        return responseMessages.failed("email_not_match");
                    }
                    if (password !== users[0].password) {
                        return responseMessages.failed("password_not_macth");
                    }
                    let send_response = {}
                    var token = await validator.create_client_token(form_data);
                    send_response.user_token = token;
                    return responseMessages.success("user_login_success", send_response);
                }
                else {
                    return responseMessages.failed("check_credential", "", form_data.lang_code);
                }
            })
            .catch((err) => {
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }

    async addStudent(form_data) {
        var students = await adminModel.findStudent(form_data);
        if (students.length > 0) {
            return responseMessages.failed("student_already_added");
        }
        form_data.birth_date = moment(new Date(form_data.birth_date)).format('L');
        return adminModel.addStudent(form_data)
            .then(async (id) => {
                if (id) {
                    return responseMessages.success("student_add_successfully");
                }
                else {
                    return responseMessages.failed("student_not_added", "", form_data.lang_code);
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }

    async studentList(form_data) {
        return adminModel.getAllStudent(form_data)
            .then(async (students) => {
                if (students.length > 0) {
                    delete form_data.limit;
                    delete form_data.offset;
                    var studentobjs = await adminModel.getAllStudent(form_data)
                    var response_obj = {
                        total_count: studentobjs.length,
                        students: students
                    }
                    return responseMessages.success("get_student_success", response_obj);
                }
                else {
                    return responseMessages.failed("student_not_found");
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong");
            })
    }

    async getStudentById(form_data) {
        return adminModel.findStudent(form_data)
            .then(async (students) => {
                if (students.length > 0) {
                    return responseMessages.success("get_student_success", students[0]);
                }
                else {
                    return responseMessages.failed("student_not_found");
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong");
            })
    }

    async editStudentDetail(form_data) {
        return adminModel.findStudent(form_data)
            .then(async (students) => {
                if (students.length > 0) {
                    if (form_data.birth_date) {
                        form_data.birth_date = moment(new Date(form_data.birth_date)).format('L');
                    }
                    await adminModel.updateStudentDetails(form_data)
                    return responseMessages.success("update_student_detail");
                }
                else {
                    return responseMessages.failed("student_not_found");
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong");
            })
    }

    async addWorkingDays(form_data) {
        var years = await adminModel.checkYearModel(form_data);
        if (years.length > 0) {
            return responseMessages.failed("year_days_already_added");
        }
        return adminModel.addWorkingDays(form_data)
            .then(async (id) => {
                if (id) {
                    return responseMessages.success("year_days_added_successfully");
                }
                else {
                    return responseMessages.failed("issue_add_days", "", form_data.lang_code);
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }

    async editWorkingDays(form_data) {
        var years = await adminModel.checkYearModel(form_data);
        if (years.length > 0) {
            return adminModel.editWorkingDays(form_data)
                .then(async (id) => {
                    if (id) {
                        return responseMessages.success("year_days_update_successfully");
                    }
                    else {
                        return responseMessages.failed("year_days_update_issue", "", form_data.lang_code);
                    }
                })
                .catch((err) => {
                    console.log("err", err)
                    let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                    return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
                })
        } else {
            return responseMessages.failed("not_found_year");
        }
    }

    async getWorkingDays(form_data) {
        return adminModel.checkYearModel(form_data)
            .then(async (yeardays) => {
                if (yeardays.length > 0) {
                    return responseMessages.success("fetch_working_days", JSON.parse(yeardays[0].working_days));
                }
                else {
                    return responseMessages.failed("not_found_year", "", form_data.lang_code);
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }


    storeSalesIteam(form_data) {
        console.log("form_data",form_data.itemXmlfile);
        var xmljson = parser.xml2json(form_data.itemXmlfile);
        console.log("to json -> %s", JSON.stringify(xmljson));
      return;


        return adminModel.checkYearModel(form_data)
            .then(async (yeardays) => {
                if (yeardays.length > 0) {
                    return responseMessages.success("fetch_working_days", JSON.parse(yeardays[0].working_days));
                }
                else {
                    return responseMessages.failed("not_found_year", "", form_data.lang_code);
                }
            })
            .catch((err) => {
                console.log("err", err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }

}
