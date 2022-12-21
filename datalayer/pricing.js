const { dbCon } = require('../db');

var getPricingList = function () {
    return new Promise(function (resolve, reject) {
        dbCon.query('SELECT P.Days, P.PlanId, PR.Price, PR.Currancy, P.Name FROM mojo_subscription.pricing PR INNER JOIN mojo_subscription.plan P ON P.PlanId = PR.PlanId', function (err, result, field) {
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
    getPricingList
}