const path = require("path");
const dbconnection = require(path.join(global.appRoot + "/helper/dbconnection"));
module.exports = class AdminModel {
    async getAdmin() {
        var query = "SELECT * FROM admin_user"
        return await dbconnection.executevaluesquery(query, [])
    }

    async addStudent(form_data) {
        var transactionQuery = "INSERT INTO `mst_student` (`birth_date`,`birth_place`,`cast`,`register_number`,`first_name`,`middle_name`,`last_name`) VALUES (?,?,?,?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.birth_date, form_data.birth_place, form_data.cast, form_data.register_number, form_data.first_name, form_data.middle_name, form_data.last_name]);
    }

    async findStudent(form_data) {
        var query = `SELECT * FROM mst_student where register_number=${form_data.register_number}`
        return await dbconnection.executevaluesquery(query, [form_data.register_number])
    }

    async getAllStudent(form_data) {
        var query = "SELECT * FROM mst_student "
        if (form_data.searchword) {
            query = query + ` WHERE register_number LIKE '%${form_data.searchword}%' 
            OR first_name LIKE '%${form_data.searchword}%' 
            OR last_name LIKE '%${form_data.searchword}%'
            OR birth_place LIKE '%${form_data.searchword}%'
            OR cast LIKE '%${form_data.searchword}%' `
        }
        if (form_data.limit) {
            query = query + " limit " + form_data.limit;
        }
        if (form_data.offset) {
            query = query + " offset " + form_data.offset;
        }
        return await dbconnection.executevaluesquery(query, [])
    }

    async updateStudentDetails(form_data) {
        var query = ` update  mst_student set  `
        if (form_data.first_name) {
            query = query + ` first_name= '${form_data.first_name}',`;
        }
        if (form_data.middle_name) {
            query = query + ` middle_name= '${form_data.middle_name}',`;
        }
        if (form_data.last_name) {
            query = query + ` last_name= '${form_data.last_name}',`;
        }
        if (form_data.birth_place) {
            query = query + ` birth_place= '${form_data.birth_place}',`;
        }
        if (form_data.birth_date) {
            query = query + ` birth_date= '${form_data.birth_date}',`;
        }
        if (form_data.cast) {
            query = query + ` cast= '${form_data.cast}'`;
        }
        query = query + ` where register_number=${form_data.register_number}`
        return await dbconnection.executevaluesquery(query, [])
    }

    async insertSubscriptionTransaction(form_data, subscription, transactionsId) {
        var transactionQuery = "INSERT INTO `transaction_details` (`ofr_type`,`customer_id`,`subscription_code`,`payment_type`,`transactions_Id`,`amount`,`trans_type`,`quantity`,"
            + "`redeem_point_per_quantity`,`total_redeem_points`,`ofr_expiry`,`ofr_image`,`required_point`,`amount_per_value`,`cust_email`, `cust_phone`,`cust_membership_no`, `cust_name`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, ["subscription", form_data.customer_id, form_data.sub_code, form_data.payment_type,
            transactionsId, form_data.amount, 'BURN', 1, form_data.paid_by_points, form_data.paid_by_points, subscription.expiry,
            subscription.mobile_image, form_data.paid_by_points, form_data.paid_by_cash, form_data.email, form_data.phone, form_data.membership_no, form_data.name]);
    }

    async checkYearModel(form_data) {
        var query = `SELECT * FROM mst_working_days where year=${form_data.year}`
        return await dbconnection.executevaluesquery(query, [])
    }

    async addWorkingDays(form_data) {
        var transactionQuery = "INSERT INTO `mst_working_days` (`year`,`working_days`) VALUES (?,?)"
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.year, JSON.stringify(form_data)]);
    }

    async editWorkingDays(form_data) {
        var transactionQuery = `update mst_working_days set working_days = ? where  year ='${form_data.year}'`
        return await dbconnection.executevaluesquery(transactionQuery, [JSON.stringify(form_data)]);
    }
}