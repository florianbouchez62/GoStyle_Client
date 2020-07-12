import db from './Database';


export function createTablePromotions(){
    db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS promotions (" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "code TEXT NOT NULL," +
                "description TEXT NOT NULL," +
                "start_date TEXT NOT NULL," +
                "end_date TEXT NOT NULL," +
                "scan_date TEXT NOT NULL," +
                "percentage REAL NOT NULL," +
                "image TEXT NOT NULL," +
                "api_path TEXT NOT NULL UNIQUE);",
                [],
                (tx, results) => {console.log("Table promotions created successfully: " + results);},
                (tx, error) => {console.log("Could not create table promotions: " + error);}
            );
        },
        error => { console.log("Error on transaction (create table promotions): " + error);},
        () => {console.log("Transaction done (create table promotions) successfully !");}
    );
}

export function dropTablePromotions(){
    db.transaction(tx => {
            tx.executeSql("DROP TABLE IF EXISTS promotions",
                [],
                (tx, results) => {console.log("Table promotions dropped successfully: " + results)},
                (tx, error) => {console.log("Could not drop table promotions: " + error);}
                );
        },
        error => { console.log("Error on transaction (drop table promotions): " + error);},
        () => {console.log("Transaction done (drop table promotions) successfully !");}
    );
}

export function insertPromotion(promotion, apiPath, currentDate){
    db.transaction(
        tx => {

            tx.executeSql(
                "INSERT INTO promotions (code, description, start_date, end_date, scan_date, percentage, image, api_path) VALUES (?,?,?,?,?,?,?,?)",
                [promotion._code, promotion._description, promotion._start, promotion._end, currentDate, promotion._percentage, promotion._image, apiPath],
                (tx, results) => {console.log("Row promotions inserted successfully: " + results);},
                (tx, error) => {console.log("Could not insert row promotions: " + error);}
            );

        },
        error => {
            console.log("Error on transaction (insert row promotions): " + error);
        },
        () => {
            console.log("Transaction done (insert row promotions) successfully !");
        }
    );
}

export function findPromotionByPath(apiPath){
    return new Promise(function(resolve, reject) {
        db.transaction(
            tx => {
                tx.executeSql("select count(*) as 'exists' from promotions where api_path = ?",
                    [apiPath],
                    (tx, result) => { resolve(parseInt(JSON.stringify(result.rows.item(0).exists))); },
                    (tx, error) => {console.log("Could not select nb of all promotions by path: " + error);}
                );
            },
            error => { console.log("Error on transaction (select count promotion by path): " + error);},
            () => {console.log("Transaction done (select count promotion by path) successfully !");}
        );
    });
}

export function getLastPromotionScanned(){
    return new Promise(function (resolve, reject) {
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Promotions ORDER BY id DESC LIMIT 1',
                    [],
                    (tx, result) => {resolve(result.rows.item(0))},
                    (tx, error) => {console.log("Could not get last promotion: " + error);}
                    );
            },
            error => {console.log("Error on transaction (select last promotion): " + error);},
            () => {console.log("Transaction done (select last promotion) successfully !");}
        );
    });
}

export function getAllPromotionsScanned(){
    return new Promise(function(resolve, reject) {
        db.transaction(
          tx => {
              tx.executeSql('SELECT * FROM Promotions ORDER BY id DESC',
                  [],
                  (tx, result) => {
                      var temp = [];
                      for (let i = 0; i < result.rows.length; ++i) {
                          const item = result.rows.item(i);

                          const start_date_format = new Date(item.start_date);
                          item.start_date = ('0' + start_date_format.getDate()).slice(-2) + '/'
                              + ('0' + start_date_format.getMonth()).slice(-2) + '/'
                              + start_date_format.getFullYear();

                          const end_date_format = new Date(item.end_date);
                          item.end_date = ('0' + end_date_format.getDate()).slice(-2) + '/'
                              + ('0' + end_date_format.getMonth()).slice(-2) + '/'
                              + end_date_format.getFullYear();

                          temp.push(item);
                          resolve(temp);
                      }
                  },
                  (tx, error) => {
                        console.log('Could not get all promotions :' + error);
                  }
              );
          },
            error => {console.log("Error on transaction (select all promotions): " + error);},
            () => {console.log("Transaction done (select all promotions) successfully !");}
        );
    });
}
