'use strict';

import assert from 'assert';
import { getOrganisationByName,
         getOrganisationById } from '../model/lorientechtest';
import { logInfo, logError, logWarn, logTrace } from '../common/logger';


export const handler = async (event, context, callback) => {
  const arnList = (context.invokedFunctionArn).split(":");
  const lambdaRegion = arnList[3];
  const mongodbURI = process.env.MONGODB_URI;

  try {
    const organisationName = getOrganisationByName('bob');

    if (!mongodbURI) throw Error('Missing MONGODB_URI env var');
    
    logInfo(`Success: ${organisationName}`);
    return callback(null, {
      success: true
    });

  } catch (err) {
    // no intent given, user has simply opened the skill
    logError(`Unexpected ${err}`);
    throw err;
  }

  // gets here without a callback - that is bad
  assert.fail();
};
