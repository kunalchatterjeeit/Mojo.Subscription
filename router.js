function routes() {
    /**
       * All libraries
       * **/
  
    const express = require('express');
    const router = express.Router();
  
  
    //region Routes Definition
    const routesSubscription = require('./modules/router');
    //endregion
  
    router.use('/subscription',routesSubscription); 
  
    return router;
  }
  
  module.exports = routes();
  