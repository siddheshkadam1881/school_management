"use strict";
module.exports = class offerFormatter {
    login(req) {
        let form_data = {
            email: req.body.email,
            password: req.body.password
        };
        return form_data;
    }

    addStudent(req) {
        let form_data = {
            register_number: req.body.register_number,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            birth_place: req.body.birth_place,
            cast: req.body.cast,
        };
        return form_data;
    }

    studentList(req) {
        let form_data = {
            searchword: req.body.searchword,
            limit: parseInt(req.body.limit) == 0 ? 10 : parseInt(req.body.limit),
            offset: parseInt(req.body.limit) == null ? 0 : parseInt(req.body.offset)
        };
        return form_data;
    }

    getStudentById(req){
        let form_data = {
            register_number: req.body.register_number
        };
        return form_data;
    }

    editStudentDetail(req){
        let form_data = {
            register_number: req.body.register_number,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            birth_place: req.body.birth_place,
            cast: req.body.cast
        };
        return form_data;
    }

    addWorkingDays(req){
        let form_data = {
            year: req.body.year,
            january: req.body.january,
            february : req.body.february,
            march: req.body.march,
            april: req.body.april,
            may: req.body.may,
            june: req.body.june,
            july: req.body.july,
            august: req.body.august,
            september: req.body.september,
            october: req.body.october,
            november: req.body.november,
            december: req.body.december
        };
        return form_data;
    }

    getWorkingDays(req){
        let form_data = {
            year: req.body.year
        };
        return form_data;
    }

    editWorkingDays(req){
        let form_data = {
            year: req.body.year,
            january: req.body.january,
            february : req.body.february,
            march: req.body.march,
            april: req.body.april,
            may: req.body.may,
            june: req.body.june,
            july: req.body.july,
            august: req.body.august,
            september: req.body.september,
            october: req.body.october,
            november: req.body.november,
            december: req.body.december
        };
        return form_data;
    }


    storeSalesIteam(req){
        let form_data = {
            itemXmlfile: req.body.itemXmlfile
        };
        return form_data;
    }

    getAllSalesItem(req){
        let form_data = {
            // itemXmlfile: req.body.itemXmlfile
        };
        return form_data;
    }
}