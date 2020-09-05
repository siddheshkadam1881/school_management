let jwt = require('jsonwebtoken')
let responseMessages = require(appRoot + '/modules/admin/response/admin.response');
module.exports.check_api_validation = async function (req, res, next) {
    try {
        let user_Token = req.header("USER_TOKEN");
        if (req.url !== "/rest/admin/login") {
            if (user_Token == "" || user_Token == null || user_Token == undefined) {
                return res.json(responseMessages.failed("user_invalid_token", "", req.body.lang_code));
            } else {
                let token_data = await verify_client_token(user_Token);
                if (token_data.token_info == undefined) {
                    if (token_data.err.name == 'TokenExpiredError') {
                        return res.json(responseMessages.failed("session_timeout", "", req.body.lang_code));
                    }
                    else {
                        return res.json(responseMessages.failed("user_invalid_token", "", req.body.lang_code));
                    }
                } else {
                    next();
                }
            }
        } else {
            next();
        }
    }
    catch (err) {
        console.log("errerrerr", err)
    }

};

function verify_client_token(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'school', function (err, token_info) {
            let token_data = {
                err: err,
                token_info: token_info
            }
            resolve(token_data);
        });
    })
}
module.exports.create_client_token = async function (token_data) {
    let login_token;
    token_data['iat'] = Math.floor(Date.now() / 1000);
    return new Promise(function (resolve, reject) {
        jwt.sign(token_data, 'school', {
            expiresIn: 60 * 60 * 24 * 30
        }, function (err, token) {
            login_token = token;
            resolve(login_token);
        });
    })
}



