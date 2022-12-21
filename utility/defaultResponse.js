module.exports = () => {

    const resultErrorObject = {
      error: false,
      message: ""
    };
  
    const resultSuccessObject = {
  
    };
  
    return ({
      /**
           * failure function
           * **/
      error: (error, res, status = 500) => {
        resultErrorObject.error = true;
        resultErrorObject.message = error.message;
        res.status(status).json(resultErrorObject);
      },
  
      /**
           * success function OR successfully response back
           * **/
  
      success: (message, response, res, status) => {
        resultSuccessObject.message = message;
        if (response == null){
          status = 201;
        }
        resultSuccessObject.data = response;
        resultSuccessObject.success = true;
        res.status(status).json(resultSuccessObject);
      }
    })
  }