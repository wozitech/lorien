const myOrg = require('../../lib/lorientechtest');

// input data
const organisation = {
    name: "WOZiTech Limited Two",
    founded: 2018,
    revenue: {
        currency: "GBP",
        value: 250
    },
    subsidairies: [
        {
            name: "Bob Sub",
            founded: 2016,
            revenue: {
                currency: "GBP",
                value: 0
            }
        },
        {
            name: "Woz Sub",
            founded: 2017,
            revenue: {
                currency: "GBP",
                value: 0
            }
        },
    ]
};

// mimic AWS API GW passthrough event
const thisEvent = {
    httpMethod: "DELETE",
    pathParameters: {
        name: encodeURI(organisation.name)
    },
};

process.env.LOG_LEVEL = 3;
;(async () => {
    try {
        console.log('Delete organisation: ', organisation.name);
        const returnVal = await myOrg.handler(
            thisEvent,
            { invokedFunctionArn : 'arn:aws:lambda:eu-west-1:accountid:function:wozitech-tech-test-lambda' },
            (err, data) => {
                if (err) {
                    console.error(err);
                    return -1;
                }

                console.log("local: My results: ", data);
                return 1;
            }
        );
        console.log("myOrg.handler returned: ", returnVal);
        
    } catch (err) {
        console.error("Caught local error: ", err);
    }   
})()
  