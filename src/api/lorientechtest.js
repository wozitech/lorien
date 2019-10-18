'use strict';

import assert from 'assert';
import { getOrganisationByName, createOrganisationByName, updateOrganisationByName, deleteOrganisationByName } from '../model/lorientechtest';
import { logInfo, logError, logWarn, logTrace } from '../common/logger';

// MongoDB
import { MongoClient } from "mongodb";
import OrganisationDAO from "../util/mongodb/DAO/organisationDAO";


// local helpers - should refactor
const deleteOrganisation = async (event) => {
  const theName = decodeURI(event.pathParameters.name);

  if (theName) {
    const deleted = await deleteOrganisationByName(theName);

    // only expecting one if any
    if (deleted === 1) {
      return {
        statusCode: 204       // NO_CONTENT
      };
    
    } else if (deleted === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not found'})
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unexpected'})
    };
  }
};

const updateOrganisation = async (event) => {
  const theName = decodeURI(event.pathParameters.name);
  const body = JSON.parse(event.body);

  // the name can't be changed because ir's a primary key
  if (theName) {
    const updated = await updateOrganisationByName(theName, body);

    // only expecting one if any
    if (updated === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ name: theName })
      };
    
    } else if (updated === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not found'})
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unexpected'})
    };
  }
};

const getOrganisation = async (event) => {
  const theName = decodeURI(event.pathParameters.name);

  if (theName) {
    const organisationName = await getOrganisationByName(theName);

    // only expecting one if any
    if (organisationName && organisationName[0]) {
      return {
        statusCode: 200,
        body: JSON.stringify(organisationName)
      };
    
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not found'})
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Expected organisation name'})
    };
  }
};

const createOrganisation = async (event) => {
  const body = JSON.parse(event.body);

  // TODO - validation should be in the model
  // input validation - pseudologic
  if (body.founded < 1900) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: '"founded" unexpected'})
    };
  }

  const organisation = await createOrganisationByName(body);

  // only expecting one if any
  if (organisation) {
    return {
      statusCode: 201,
      body: JSON.stringify(organisation)
    };
  
  } else {
    // TODO - tidy up the error handling here - especially trapping for duplicates
    //    - assume if there is an error is because duplicates
    return {
      statusCode: 409,
      body: JSON.stringify({ error: 'duplicate'})
    };
  }
};

let conn = null;
const initialiseMongoDB = async () => {
  const mongodbURI = process.env.MONGODB_URI;
  if (!mongodbURI) throw Error('Missing MONGODB_URI env var');

  conn = await MongoClient.connect(
    mongodbURI,
    {
      useNewUrlParser: true,
      poolSize: 5,
      wtimeout: 2500,
    },
  );

  await OrganisationDAO.initialise(conn);
};


export const handler = async (event, context, callback) => {
  const arnList = (context.invokedFunctionArn).split(":");
  const lambdaRegion = arnList[3];

  // console.log("WA DEBUG - the event method: ", event.httpMethod);
  // console.log("WA DEBUG - the event parameters: ", event.pathParameters);
  // console.log("WA DEBUG - the event body: ", JSON.parse(event.body));

  await initialiseMongoDB();

  let results = null;
  try {

    switch (event.httpMethod) {
      case "POST":
        results = await createOrganisation(event);
        break;
      
      case "PUT":
        results = await updateOrganisation(event);
        break;

      case "DELETE":
        results = await deleteOrganisation(event);
        break;

      case "GET":
      default:
        results = await getOrganisation(event);
        break;
    }
    
    // callback(null, results);
    return results;

  } catch (err) {
    // no intent given, user has simply opened the skill
    logError(`Unexpected ${err}`);
    // callback(err,null);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'undisclosed' })
    };
  }

  // gets here without a callback - that is bad
  assert.fail();
};
