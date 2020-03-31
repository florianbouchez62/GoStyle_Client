import { api } from '../util/api';
import QRScanActivity from  '../Activity/QRScanActivity';
import {Promotion} from "../models/Promotion";

/*We're building tests that makes requests
against the gostyle API
but we don't want to actually make requests to that API every time we run our tests.
That means we need to mock the fetch request and substitute a response.
*/

beforeEach(() => {
  fetch.resetMocks();
});

//Test API
it('returns result if array', () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return api('/promotions')
        .then(onResponse)
        .catch(onError)
        .finally(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0][0]).toEqual({ id: 1 });
        });
});

//Test API
it('returns result if non-empty object', () => {
  fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/promotions')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0]).toEqual({ id: 1 });
    });
});

//Test API
it('throws an error if empty object', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api('/promotions')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });
});

//Test DB
var sqlResult = { insertId: 1, rows: { _array: [] } };
const tx = { executeSql: jest.fn((query, sub=[], func=()=>true) => func({}, sqlResult)) };
const db = { transaction: jest.fn((func) => func(tx)) };

describe('Test insertDb', () => {
    let apiPath="/promotions/999";
    let img = "";
    QRScanActivity.insertDb(new Promotion(999, 'nameTest','descTest', '2030-03-20', '2030-03-21', 50.0, img), apiPath, db);

    //Test l'insertDb mais ne vérifie pas si les types sont bon, si % est un string, le test sera bon par exemple
    //Mais si au lieu de créé une nouvelle promotion on met "null", le test ne passera pas

    it('mocks sql', () => {
        expect(tx.executeSql.mock.calls.length).toBeGreaterThan(0);
    });
});