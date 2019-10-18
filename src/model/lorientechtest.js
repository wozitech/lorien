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


// update organisation by name
export const updateOrganisationByName = async (name, organisation) => {
  // TODO - validation should be here
  // TODO - partial update - assumes revenue and founded are given, and if not, will overwrite the document values
  return OrganisationDAO.updateByName(name, organisation.revenue, organisation.founded);
};
