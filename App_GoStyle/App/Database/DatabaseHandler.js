import db from './Database';


export function createTablePromotions(){
    db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS promotions (" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name TEXT NOT NULL," +
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
                "INSERT INTO promotions (name, description, start_date, end_date, scan_date, percentage, image, api_path) VALUES (?,?,?,?,?,?,?,?)",
                [promotion._name, promotion._description, promotion._start, promotion._end, currentDate, promotion._percentage, promotion._image, apiPath],
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
