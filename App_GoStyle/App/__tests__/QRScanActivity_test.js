import { api } from '../util/api';
import {insertPromotion} from  '../Database/DatabaseHandler';
import {createTablePromotions} from  '../Database/DatabaseHandler';
import {dropTablePromotions} from  '../Database/DatabaseHandler';
import {Promotion} from "../models/Promotion";


/*We're building tests that makes requests
against the gostyle API
but we don't want to actually make requests to that API every time we run our tests.
That means we need to mock the fetch request and substitute a response.
*/


beforeEach(() => {
  fetch.resetMocks();

});

//Test DB

describe('Test create table promotions', () => {
    var sqlResult = { insertId: 1, rows: { _array: [] },  };
    const tx = { executeSql: jest.fn((query, sub=[], func=()=>true) => func({}, sqlResult)) };
    const db = { transaction: jest.fn((func) => func(tx)) };
    createTablePromotions(db);

    it('mocks sql', () => {
        expect(tx.executeSql.mock.results[0].value).toBe(sqlResult.insertId);
    });
});

describe('Test drop table promotions', () => {
    var sqlResult = { insertId: 1, rows: { _array: [] },  };
    const tx = { executeSql: jest.fn((query, sub=[], func=()=>true) => func({}, sqlResult)) };
    const db = { transaction: jest.fn((func) => func(tx)) };
    dropTablePromotions(db);
    it('mocks sql', () => {
        expect(tx.executeSql.mock.results[0].value).toBe(sqlResult.insertId);
    });
});

describe('Test insertDb', () => {
    var sqlResult = { insertId: 1, rows: { _array: [] },  };
    const tx = { executeSql: jest.fn((query, sub=[], func=()=>true) => func({}, sqlResult)) };
    const db = { transaction: jest.fn((func) => func(tx)) };
    const now = new Date();
    let apiPath="/promotions/999";
    const Promo = new Promotion(999, 'nameTest','descTest', '2030-03-20', '2030-03-21', 50.0, '')
    insertPromotion(Promo, apiPath, now, db);

    it('mocks sql', () => {
        expect(tx.executeSql.mock.calls[0][1]).toStrictEqual(['nameTest','descTest', '2030-03-20', '2030-03-21',now, 50.0,'', apiPath])
    });
});







