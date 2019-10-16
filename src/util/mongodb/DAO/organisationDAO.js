import { ObjectId } from "bson"

const THIS_DB='lorien';
const THIS_COLLECTION='organisation';

let organisation

export default class OrganisationDAO {
  constructor() {

  }

  static async  initialise(conn) {
    if (organisation) {
      return
    }
    try {
      organisation = await conn.db(THIS_DB).collection(THIS_COLLECTION)
    } catch (e) {
      console.error(`Unable to establish a collection handle in OrganisationDAO: ${e}`);
    }

  }

  /**
   * Retrieves organisation by name
   */
  static async getByName(name) {
    // returning an array of - in preparation for filtered/faceted/wildcard searches
    let cursor;
    try {
      cursor = await organisation
        .find(
          {
            _id : name
          },
          {
            projection: {
              _id: 0,
              name: "$_id",
              founded: 1,
              revenue: 1,
              subsidaries: 1,
            }
          }
        );
    } catch (e) {
      console.error(`Unable to find organsiation by name, ${e}`)
      return [];
    }

    return cursor.toArray();
  }

  /**
   * Create organisation by name
   */
  static async createByName(thisOrganisation) {
    // returning an array of - in preparation for filtered/faceted/wildcard searches
    let cursor;
    try {
      const commentDoc = {
        _id: thisOrganisation.name,
        founded: thisOrganisation.founded,
        revenue: thisOrganisation.revenue
      };
      const addResponse = await organisation.insertOne(commentDoc);

      // TODO: better expected error handling from insertOne 
      return thisOrganisation;

    } catch (e) {
      console.error(`Unable to create organsiation by name, ${e}`)
      return null;
    }
  }
}