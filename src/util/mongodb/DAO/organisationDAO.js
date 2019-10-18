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
   * Updates an organisation by name; excludes subidairies
   */
  static async updateByName(name, revenue, founded) {
    try {
      const updateResponse = await organisation.updateOne(
        { _id: name, },
        { $set: {
            revenue,
            founded,
          }
        },
      );

      let returnVal=0;
      updateResponse && updateResponse.result && updateResponse.result.n===1 ? returnVal=1 : false;
      updateResponse && updateResponse.result && updateResponse.result.n===0 ? returnVal=-1 : false;

      return returnVal;
    } catch (e) {
      console.error(`Unable to update organsiation by name, ${e}`)
      return false;
    }

  }

  /**
   * Retrieves organisation by name
   */
  static async getByName(name) {
    // returning an array of - in preparation for filtered/faceted/wildcard searches
    try {
      let cursor;
      cursor = await organisation.find({ _id : name });

      const results =  await cursor.toArray();
      // remap _id to name
      return results.map(thisOrg => {
        return {
          name: thisOrg._id,
          founded: thisOrg.founded,
          revenue: thisOrg.revenue,
          subsidairies: thisOrg.subsidairies,
        };
      });
  
    } catch (e) {
      console.error(`Unable to find organsiation by name, ${e}`)
      return [];
    }
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
        revenue: thisOrganisation.revenue,
        subsidairies: thisOrganisation.subsidairies,
      };
      const addResponse = await organisation.insertOne(commentDoc);

      // TODO: better expected error handling from insertOne 
      return thisOrganisation;

    } catch (e) {
      console.error(`Unable to create organsiation by name, ${e}`)
      return null;
    }
  }

  /**
   * Deletes an organisation by name; excludes subidairies
   */
  static async deleteByName(name, revenue, founded) {
    try {
      const deleteResponse = await organisation.deleteOne(
        { _id: name, },
      );

      let returnVal=0;
      deleteResponse && deleteResponse.result && deleteResponse.result.n===1 ? returnVal=1 : false;
      deleteResponse && deleteResponse.result && deleteResponse.result.n===0 ? returnVal=-1 : false;

      return returnVal;
    } catch (e) {
      console.error(`Unable to delete organsiation by name, ${e}`)
      return false;
    }
  }
}