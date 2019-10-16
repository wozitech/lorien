'use strict';

import assert from 'assert';
import { getOrganisationByName,
         getOrganisationById } from '../model/lorientechtest';
import { logInfo, logError, logWarn, logTrace } from '../common/logger';

// MongoDB
import { MongoClient } from "mongodb";
import OrganisationDAO from "../util/mongodb/DAO/organisationDAO";


export const handler = async (event, context, callback) => {
  const arnList = (context.invokedFunctionArn).split(":");
  const lambdaRegion = arnList[3];
  const mongodbURI = process.env.MONGODB_URI;

  try {
    const organisationName = getOrganisationByName('bob');

    if (!mongodbURI) throw Error('Missing MONGODB_URI env var');

    const conn = await MongoClient.connect(
      mongodbURI,
      {
        useNewUrlParser: true,
        poolSize: 5,
        wtimeout: 2500,
      },
    );

    await OrganisationDAO.initialise(conn);

    const byName = await OrganisationDAO.getByName('warren');
    console.log("WA DEBUG - getByname: ", byName);
    
    logInfo(`Success: ${organisationName}`);
    // return callback(null, {
    //   success: true
    // });

    return {
      success: true
    }

  } catch (err) {
    // no intent given, user has simply opened the skill
    logError(`Unexpected ${err}`);
    throw err;
  }

  // gets here without a callback - that is bad
  assert.fail();
};
