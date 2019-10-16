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

        fit ('should ...', async () => {
        });
    });
    
    describe('Get', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        fit ('should ....', async () => {
        });
    });


    describe('Update', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        fit ('should ....', async () => {
        });
    });

    describe('Delete', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        fit ('should ....', async () => {
        });
    });
});