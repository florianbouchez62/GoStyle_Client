import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Component/bottomNav'
import db from './Database/Database';

export default class App extends React.Component {

  componentDidMount() {
    db.transaction(tx => {
      //A ENLEVER : La table se vide automatiquement pour tester
      tx.executeSql("DROP TABLE IF EXISTS promotions");
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

  render() {
    return (
        <Navigation/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
