import { handler } from '../../src/api/lorientechtest';
import uuid from 'uuid';

const getOrganisationByNameMock = jest.fn();
const getOrganisationByIdMock = jest.fn();

describe('Lorien Tech Check Tests', () => {

    describe('Create', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it.skip ('should create a new organisation by name', async () => {
        });
        it.skip ('should create a new subsidairy by name against an existing organisation', async () => {
        });
        it.skip ('should fail creating a new organisation by duplicate name', async () => {
        });
        it.skip ('should fail creating a new subsidairy by name against an unknown organisation', async () => {
        });
        it.skip ('should fail creating a new organisation by name with invalid "founded date"', async () => {
        });
        it.skip ('should fail creating a new organisation by name with invalid "revenue currency"', async () => {
        });
        it.skip ('should fail creating a new organisation by name with invalid "revenue value"', async () => {
        });
        it.skip ('should fail creating a new subsidairy by name with invalid "founded date"', async () => {
        });
        it.skip ('should fail creating a new subsidairy by name with invalid "revenue currency"', async () => {
        });
        it.skip ('should fail creating a new subsidairy by name with invalid "revenue value"', async () => {
        });
    });
    
    describe('Get', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it.skip ('should return a known organisation by name', async () => {
        });
        it.skip ('should return a known subsidairy\'s by name against parent\'s name', async () => {
        });
        it.skip ('should fail to return an unknown organisation by name', async () => {
        });
        it.skip ('should fail to return an unknown subsidairy by name against parent\'s name', async () => {
        });
    });


    describe('Update', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it.skip ('should update an organisation by name', async () => {
        });
        it.skip ('should update a subsidary by name  against parent\'s name', async () => {
        });
        it.skip ('should fail to update an unknown organisation by name', async () => {
        });
        it.skip ('should fail to update an unknown subsidary by name against unknown parent\'s name', async () => {
        });
        it.skip ('should fail to update an unknown subsidary by name against known parent\'s name', async () => {
        });
        it.skip ('should fail to update an organisation by name with invalid "founded date"', async () => {
        });
        it.skip ('should fail to update an organisation by name with invalid "revenue currency"', async () => {
        });
        it.skip ('should fail to update an organisation by name with invalid "revenue value"', async () => {
        });


        it.skip ('should fail to update a subsidairy by name with invalid "founded date"', async () => {
        });
        it.skip ('should fail to update a subsidairy by name with invalid "revenue currency"', async () => {
        });
        it.skip ('should fail to update a subsidairy by name with invalid "revenue value"', async () => {
        });

    });

    describe('Delete', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it.skip ('should delete an organisation by name', async () => {
        });
        it.skip ('should delete a subsidairy by name against a known parent\'s name', async () => {
        });
        it.skip ('should fail to delete an unknwon organisation by name', async () => {
        });
        it.skip ('should fail to delete an unknown subsidairy by name against a known parent\'s name', async () => {
        });
        it.skip ('should fail to delete an subsidairy by name against an unknown parent\'s name', async () => {
        });
    });
});