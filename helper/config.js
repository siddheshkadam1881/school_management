let environment = {
    development: {
        "host": "sql12.freemysqlhosting.net",
        "user": "sql12363973",
        "password": "PvK3I7LuEU",
        "database": "sql12363973",
        "port": 3000,
        "clientExpire": 60 * 60 * 24 * 365
    },
    uat: {
    },
}

exports.get = function (env) {
    try {
        return environment[env];
    } catch (err) {
        console.log(err);
    }
};
