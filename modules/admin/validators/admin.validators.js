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
}