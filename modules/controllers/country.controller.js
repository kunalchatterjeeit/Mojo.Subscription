function controller(req) {

    /**
        * all required libraries
        * **/
    const defaultResponse = require('../../utility/defaultResponse');
    const country = require('../../datalayer/country');


    /**
       * public functions
       * **/

    return ({
        getList: async (res) => {
            try {                
                //await consumer.consumeKafkaMessage();
                const result = await country.getCountryList();           
                defaultResponse().success('List fetched successfully.', result, res, 200, null);

            } catch (exception) {
                console.log(exception);
                defaultResponse().error(exception, res, 500);
            }
        },
    });
}

module.exports = controller;