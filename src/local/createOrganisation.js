const myOrg = require('../../lib/lorientechtest');

// input data
const organisation = {
    name: "WOZiTech Limited",
    founded: 2016,
    revenue: {
        currency: "GBP",
        value: 100
    }
};

const local = async () => {
    try {
        console.log('Create organisation: ', organisation.name);
        const returnVal = await myOrg.handler(
            organisation,
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