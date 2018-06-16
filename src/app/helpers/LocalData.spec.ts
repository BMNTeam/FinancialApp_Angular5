import {LocalData} from './LocalData';
import {quotations} from '../connection.service.spec';

describe('LocalDataHelper', () => {

    beforeEach(() => {
        if (!LocalData.isInitialized()) {
           LocalData.init();
        }
    });

    afterEach(() => {
        LocalData.save([]);

    });
    it('should initialise data in local storage', () => {
        expect(LocalData.isInitialized()).toBeTruthy();
    });

    it('should save quotation to local storage', () => {
        expect(LocalData.getAllQuotations().length).toBe(0);

        LocalData.save(quotations);
        expect(LocalData.getAllQuotations().length).toBeGreaterThan(0);
    });

    it('should delete quotation from local storage', () => {
        LocalData.save(quotations);
        expect(LocalData.getAllQuotations().length).toBe(quotations.length);

        LocalData.delete(quotations[0].name);
        expect(LocalData.getAllQuotations().length).toBeLessThan(quotations.length);
    });

    it('should resolve currencies list', () => {
        LocalData.save(quotations);
        expect(LocalData.getCurrenciesList().length).toBe(quotations.length);
    });

    it( 'should check whether item exist in local storage or not', () => {
        LocalData.save(quotations);
        expect(LocalData.exist(quotations[0].name)).toBeTruthy();
        expect(LocalData.exist('something')).toBeFalsy();
    });


});
