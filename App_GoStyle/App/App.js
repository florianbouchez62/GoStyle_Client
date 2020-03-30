import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Component/bottomNav'

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("local.db");

export default class App extends React.Component {

  componentDidMount() {
    db.transaction(tx => {
      //A ENLEVER : La table se vide automatiquement pour tester
      tx.executeSql("DROP TABLE IF EXISTS Promotion");
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Promotion (" +
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
          (tx, results) => {console.log("Table Promotion created successfully: " + results);},
          (tx, error) => {console.log("Could not create table Promotion: " + error);}
      );
    },
        error => { console.log("Error on transaction (create table Promotion): " + error);},
        () => {console.log("Transaction done (create table Promotion) successfully !");}
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
