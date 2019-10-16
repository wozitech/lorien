import { ObjectId } from "bson"

const THIS_DB='lorien';
const THIS_COLLECTION='organisation';

let organisation
let lorien

export default class OrganisationDAO {
  constructor() {

  }

  static async  initialise(conn) {
    if (organisation) {
      return
    }
    try {
      lorien = await conn.db(THIS_DB)
      organisation = await conn.db(THIS_DB).collection(THIS_COLLECTION)
    } catch (e) {
      console.error(`Unable to establish a collection handle in OrganisationDAO: ${e}`);
    }

  }

  /**
   * Retrieves organisation by name
   */
  static async getByName(name) {
   let cursor
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
}