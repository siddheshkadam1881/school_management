module.exports = class adminValidator {
    login() {
        let returnData = {
            email: "required|email",
            password: "required"
        };
        return returnData;
    }

    addStudent() {
        let returnData = {
            register_number: "required",
            first_name: "required",
            middle_name: "required",
            last_name: "required",
            birth_date: "required|date",
            birth_place: "required",
            cast: "required"
        };
        return returnData;
    }

    studentList() {
        let returnData = {
            offset: "required|numeric",
            limit: "required|numeric|max:99|digits_between:1,2"
        };
        return returnData;
    }

    getStudentById() {
        let form_data = {
            register_number: "required",
        };
        return form_data;
    }

    addWorkingDays() {
        let form_data = {
            year: "required|numeric",
            january: "required|numeric",
            february: "required|numeric",
            march: "required|numeric",
            april: "required|numeric",
            may: "required|numeric",
            june: "required|numeric",
            july: "required|numeric",
            august: "required|numeric",
            september: "required|numeric",
            october: "required|numeric",
            november: "required|numeric",
            december: "required|numeric"
        };
        return form_data;
    }

    getWorkingDays() {
        let form_data = {
            year: "required|numeric"
        };
        return form_data;
    }

    editWorkingDays() {
        let form_data = {
            year: "required|numeric",
            january: "required|numeric",
            february: "required|numeric",
            march: "required|numeric",
            april: "required|numeric",
            may: "required|numeric",
            june: "required|numeric",
            july: "required|numeric",
            august: "required|numeric",
            september: "required|numeric",
            october: "required|numeric",
            november: "required|numeric",
            december: "required|numeric"
        };
        return form_data;
    }


    storeSalesIteam() {
        let form_data = {
            itemXmlfile: "required"
        };
        return form_data;
    }
}