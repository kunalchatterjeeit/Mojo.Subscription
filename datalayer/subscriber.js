const { dbCon } = require('../db');

var insertSubscriber = function (req) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO subscriber
        (RegistrationId, Name, EmailId, Phone, CompanyName, BillingDetails) 
	    VALUES ("${req.registrationId}", "${req.name}", "${req.email}", "${req.phone}", "${req.companyName}", "${req.billingDetails}")`;

        dbCon.query(sql, function (err, result, field) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
        getLastSubsId(req);        
    });
};

var getLastSubsId = function (req) {
    return new Promise(function (resolve, reject) {
        dbCon.query('SELECT LAST_INSERT_ID();', function (err, result, field) {
            if (err) {
                console.log("ERROR 3");
                reject(err);
            } else {
                console.log(result);
                insertSubscription(result[0]['LAST_INSERT_ID()'],req);
            }
        });
    });
};

var insertSubscription = function (id, req) {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO subscription
        (SubscriberId, PlanId, SubscriptionStartDate, SubscriptionEndDate, PurchaseDate, SubscriptionStatusId, SelectedCountries) 
	    VALUES ("${id}", "${req.planId}", "${req.subscriptionStartDate}", "${req.subscriptionEndDate}", "${req.purchaseDate}", "${req.subscriptionStatusId}", "${req.selectedCountries}")`;

        dbCon.query(sql, function (err, result, field) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        }); 
    });
};

var getSubscriptionList = function (req) {
    return new Promise(function (resolve, reject) {
        const sql = `
        SELECT PR.Name as Product, P.Name as Plan, SU.SubscriptionStartDate, SU.SubscriptionEndDate,SU.PurchaseDate, SU.SelectedCountries FROM mojo_subscription.subscription SU 
INNER JOIN mojo_subscription.subscriber S ON SU.SubscriberId = S.SubscriberId 
INNER JOIN mojo_subscription.plan P ON P.PlanId = SU.PlanId
INNER JOIN mojo_subscription.product PR ON PR.ProductId = P.ProductId
WHERE S.RegistrationId = ${req.registrationId};`;

        dbCon.query(sql, function (err, result, field) {
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
    insertSubscriber,
    getSubscriptionList
}