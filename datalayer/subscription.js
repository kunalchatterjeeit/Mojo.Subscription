const { dbCon } = require('../db');
const { insertIdentity } = require('../datalayer/indentity');

var getUsertypeList = function () {
    return new Promise(function (resolve, reject) {
        dbCon.query('SELECT * FROM user_type', function (err, result, field) {
            if (err) {
                console.log("ERROR 3");
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


var insertRegistration = function (req) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO user_registration
        (UserTypeId, Name, Email, Phone, CompanyName, Description, RegistrationDate) 
	    VALUES ("${req.userTypeId}", "${req.name}", "${req.email}", "${req.phone}", "${req.companyName}", "${req.description}", "${req.registrationDate}")`;

        dbCon.query(sql, function (err, result, field) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
        getLastRegId(req);        
    });
};

var getLastRegId = function (req) {
    return new Promise(function (resolve, reject) {
        dbCon.query('SELECT LAST_INSERT_ID();', function (err, result, field) {
            if (err) {
                console.log("ERROR 3");
                reject(err);
            } else {
                console.log(result);
                insertIdentity(result[0]['LAST_INSERT_ID()'],req);
            }
        });
    });
};

module.exports = {
    getUsertypeList,
    insertRegistration
}