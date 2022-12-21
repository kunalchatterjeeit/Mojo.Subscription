function controller(req) {

    /**
        * all required libraries
        * **/
    const defaultResponse = require('../../utility/defaultResponse');
    const subscriber = require('../../datalayer/subscriber');

    /**
       * public functions
       * **/

    return ({
        insertSubscription: async (res) => {
            try {                
                const result = await subscriber.insertSubscriber(req.body);      
                defaultResponse().success('Inserted successfully.', result, res, 200, null);

            } catch (exception) {
                console.log(exception);
                defaultResponse().error(exception, res, 500);
            }
        },

        getAllSubscriptions: async (res) => {
            try {                
                const result = await subscriber.getSubscriptionList(req.body);      
                defaultResponse().success('List fetched successfully.', result, res, 200, null);

            } catch (exception) {
                console.log(exception);
                defaultResponse().error(exception, res, 500);
            }
        },

        getAllSubscriptions2: async (res) => {
            try {               
                const result = await subscriber.getSubscriptionList(req.body);      
                defaultResponse().success('List fetched successfully.', result, res, 200, null);

            } catch (exception) {
                console.log(exception);
                defaultResponse().error(exception, res, 500);
            }
        }
        
    });
}

module.exports = controller;