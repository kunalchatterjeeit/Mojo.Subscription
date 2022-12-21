function routes() {
  /**
     * All libraries
     * **/
  const express = require('express');
  const router = express.Router();
  var request = require('request');


  /*
    * Controller Actions
    * **/
  const pricingController = require('./controllers/pricing.controller');

  router.get('/getPricingList', (req, res) => {
    pricingController(req).getList(res);
  });


  const countryController = require('./controllers/country.controller');

  router.get('/getCountryList', (req, res) => {
    countryController(req).getList(res);
  });


  const subscriptionController = require('./controllers/subscription.controller');

  router.post('/insertSubscription', (req, res) => {
    subscriptionController(req).insertSubscription(res);
  });
  router.post('/getAllSubscriptions', (req, res) => {
    subscriptionController(req).getAllSubscriptions(res);
  });
  router.post('/getAllSubscriptions2', (req, res) => {
    subscriptionController(req).getAllSubscriptions2(res);
  });


  //exxternal APIs
  router.post('/weatherInfo', (req, res, next) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=9e3fc600084647e6b34142104222112&q=' + req.body.country;
    console.log(url);
    request({
      uri: url
    }).pipe(res);
  });


  return router;
}

module.exports = routes();
