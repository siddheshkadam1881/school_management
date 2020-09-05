let responseMessages = require("../response/admin.response");
const path = require("path");
const validator = require(path.join(global.appRoot + "/helper/client_api_validator.js"))
let adminModel = new (require("../model/admin.mysql"))();
var sha1 = require('sha1');
const moment = require('moment');

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
        
        var students=await adminModel.findStudent(form_data);
        if(students.length>0){
            return responseMessages.success("student_already_added");
        }
        form_data.birth_date=moment(new Date(form_data.birth_date)).format('L');
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
                console.log("err",err)
                let error = (typeof err.errors != 'undefined') ? err.errors : err.message;
                return responseMessages.failed("something_went_wrong", "", form_data.lang_code);
            })
    }
}
