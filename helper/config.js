let environment = {
    development: {
        "host": "sql5.freemysqlhosting.net",
        "user": "sql5487880",
        "password": "3qBYjsXKNA",
        "database": "sql5487880",
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
