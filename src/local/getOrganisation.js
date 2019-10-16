const myOrg = require('../../lib/lorientechtest');

// input data

// mimic AWS API GW passthrough event
const thisEvent = {
    httpMethod: "GET",
    pathParameters: {
        name: 'WOZiTech Limited Two'
    },
};

const local = async () => {
    try {
        console.log('Get organisation: ', thisEvent.pathParameters.name);
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
}

process.env.LOG_LEVEL = 3;
local();