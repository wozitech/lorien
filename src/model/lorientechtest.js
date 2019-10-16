import OrganisationDAO from "../util/mongodb/DAO/organisationDAO";

// get organisation by name
export const getOrganisationByName = async (name) => {
  // TODO - handle found/not found
  return OrganisationDAO.getByName(name);
};

// get organisation by name
export const createOrganisationByName = async (organisation) => {
  // TODO - validation should be here
  return OrganisationDAO.createByName(organisation);
};
