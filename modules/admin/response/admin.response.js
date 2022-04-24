let response = {
    validation_error: {
        status: false,
        status_code: 'CC422',
        message: "Incorrect data"
    },
    form_field_required: {
        message: "Form fields required",
        status_code: "CC400",
    },
    password_not_match: {
        message: "Sorry,password not match",
        status_code: "CC400"
    },
    email_not_match: {
        message: "Sorry,email not match",
        status_code: "CC400"
    },
    user_login_success: {
        message: "User login successfully",
        status_code: "CC200"
    },
    something_went_wrong: {
        message: "Something went wrong",
        status_code: "CC500"
    },
    user_invalid_token: {
        message: "Invalid user token",
        status_code: "CC401"
    },
    token_not_found: {
        message: "Token not found",
        status_code: "CC404"
    },
    session_timeout: {
        message: "Session timeout",
        status_code: "CC404"
    },
    invalid_user: {
        message: "Invalid user",
        status_code: "CC404"
    },
    student_add_successfully: {
        message: "Student add successfully",
        status_code: "CC200"
    },
    student_not_added: {
        message: "Student add failed",
        status_code: "CC400"
    },
    student_already_added: {
        message: "Student already added",
        status_code: "CC400"
    },
    get_student_success: {
        message: "Student gets successfully",
        status_code: "CC200"
    },
    student_not_found: {
        message: "Students not found",
        status_code: "CC400"
    },
    update_student_detail: {
        message: "Student details update successfully",
        status_code: "CC200"
    },
    year_days_already_added: {
        message: "Year days already added",
        status_code: "CC400"
    },
    issue_add_days: {
        message: "issue while adding days",
        status_code: "CC400"
    },
    year_days_added_successfully: {
        message: "working days of year added successfully",
        status_code: "CC200"
    },
    not_found_year: {
        message: "not found working days of this year",
        status_code: "CC400"
    },
    fetch_working_days: {
        message: "working days of year fetch successfully",
        status_code: "CC200"
    },
    year_days_update_successfully: {
        message: "working days of year update successfully",
        status_code: "CC200"
    },
    year_days_update_issue: {
        message: "working days of year update fail",
        status_code: "CC200"
    },
    fetch_sales_items:{
        message: "fetch sales items successfully",
        status_code: "CC200"
    },
    not_item_found:{
        message: "no items found",
        status_code: "CC200"
    }

}


module.exports = response;
module.exports.success = function (key, values) {
    let returnResponse = response[key] == undefined ? {} : response[key];
    returnResponse.status = true;
    values ? returnResponse.values = values : "";
    return returnResponse;
}
module.exports.failed = function (key, errors, lang) {
    console.log("key, errors, lang", key, errors, "sidn", lang)
    let returnResponse = response[key] == undefined ? {} : response[key];
    returnResponse.status = false;
    errors && errors != key ? returnResponse.error = errors : "";
    return returnResponse;
}