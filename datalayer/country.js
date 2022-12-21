const { dbCon } = require('../db');

var getCountryList = function () {
    return new Promise(function (resolve, reject) {
        dbCon.query('SELECT * FROM mojo_subscription.country;', function (err, result, field) {
            if (err) {
                console.log("ERROR 3");
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getCountryList
}