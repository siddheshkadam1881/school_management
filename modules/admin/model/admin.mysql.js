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

    async updateFailedColumn(column, value, transactionId) {
        var transactionQuery = `update transaction_details set ${column}=? ,order_status = ?, transaction_status = ? where  transactions_id= ? `;
        return await dbconnection.executevaluesquery(transactionQuery, [value, "failed", "failed", transactionId])
    }

    async updateColumn(column, value, transactionId) {
        var transactionQuery = `update transaction_details set ${column}=? ,burn_point_status=?,order_status = ?, transaction_status = ? where  transactions_id=? `;
        return await dbconnection.executevaluesquery(transactionQuery, [value, "success", "success", "success", transactionId])
    }

    async updateLockPointColumns(column, value, transactionId) {
        var transactionQuery = `update transaction_details set ${column}=? ,lock_point_status=? where  transactions_id=? `;
        return await dbconnection.executevaluesquery(transactionQuery, [value, 'success', transactionId])
    }

    async insertCustomerSubscription(form_data, transactionId, expiry_date) {
        var transactionQuery = "INSERT INTO `customer_subscription` (`cms_customer_id`,`sub_code`,`transactionId`,`expiry_date`) VALUES (?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.customer_id, form_data.sub_code, transactionId, expiry_date]);
    }

    async insertOfferTransaction(form_data, offer, transactionsId, voucher_code) {
        var transactionQuery = "INSERT INTO `transaction_details` (`offer_title`,`offer_description`,`brand_code`,`merchant_code`,`ofr_type`,`customer_id`,`ofr_code`,`payment_type`,`transactions_Id`,`amount`,`trans_type`,`quantity`,"
            + "`redeem_point_per_quantity`,`total_redeem_points`,`ofr_expiry`,`ofr_image`,`required_point`,`amount_per_value`,`voucher_code`,`cust_email`, `cust_phone`,`cust_membership_no`, `cust_name`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [offer.offer_title, offer.offer_description, offer.brand_code, offer.merchant_code, "offer", form_data.customer_id, form_data.offer_code, " ",
            transactionsId, 0, '', 1, 0, 0, offer.end_date, offer.mobile_image, 0, 0, voucher_code, form_data.email, form_data.phone, form_data.membership_no, form_data.name]);
    }

    async insertCustomerOffer(form_data, offer, voucher_code) {
        var transactionQuery = "INSERT INTO `customer_offer` (`cms_customer_id`,`offer_code`,`offer_expiry`,`voucher_code`) VALUES (?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.customer_id, form_data.offer_code, offer.end_date, voucher_code]);
    }

    async findCustomerOffers(form_data) {
        var query = `select count(*) as count from customer_offer where cms_customer_id = '${form_data.cms_customer_id}' and  offer_code= '${form_data.offer_code}'`
        return await dbconnection.executevaluesquery(query)
    }

    async updateCustomeRewardTransaction(form_data) {
        var transactionQuery = ` update  customer_reward set is_used= 1  where reward_code = ? and customer_id = ?  and voucher_code = ? `
        await dbconnection.executevaluesquery(transactionQuery, [form_data.reward_code, form_data.cms_customer_id, form_data.voucher_code])
    }

    async updateRewardTransaction(form_data) {
        var transactionQuery = ` update  transaction_details set is_used= ? , redeem_date=? where reward_code = ? and customer_id = ?  and voucher_code = ? `
        await dbconnection.executevaluesquery(transactionQuery, [1, new Date(), form_data.reward_code, form_data.cms_customer_id, form_data.voucher_code])
    }

    async findRewardUsedStatus(form_data) {
        var query = `select is_used
        from customer_reward 
        where reward_code = '${form_data.reward_code}'
        and is_used = 1
        and voucher_code = '${form_data.voucher_code}'`
        return await dbconnection.executevaluesquery(query)
    }

    async updateTotalPurchaseCount(form_data) {
        let query = `UPDATE master_reward SET total_purchase_count = total_purchase_count + 1 WHERE code = '${form_data.reward_code}' `;
        return await dbconnection.executevaluesquery(query);
    }

    async checkVelocity() {
        let query = `select * from master_velocity 
        where status = 1 `;
        return await dbconnection.executevaluesquery(query);
    }

    async updateTotalPurchaseOfferCount(form_data) {
        let query = `UPDATE mst_offer_detail SET total_used_count = ${form_data.total_used_count} WHERE offer_code = '${form_data.offer_code}' `;
        return await dbconnection.executevaluesquery(query);
    }

    async createScanTransaction(form_data, transactionId, imagePath) {
        var transactionQuery = "INSERT INTO `transaction_details` (`customer_id`,`transactions_id`,`ofr_type`,`ofr_image`) VALUES (?,?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.cms_customer_id, transactionId, 'scratch_win', imagePath]);
    }

    async createScanDetails(form_data, transactionId, imagePath) {
        var transactionQuery = "INSERT INTO `scratch_win_details` (`customer_id`,`transaction_id`,`invoice_image`) VALUES (?,?,?)";
        return await dbconnection.executevaluesquery(transactionQuery, [form_data.cms_customer_id, transactionId, imagePath]);
    }
}