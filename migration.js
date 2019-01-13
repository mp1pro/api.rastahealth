/**
 * Created by mp1pro on 12/27/18.
 */

//****mySQL****//
import mysql from 'mysql';

// conect to mysql

//create config schema
let dbconfig = {
    host: "localhost",
    user: "root",
    password: "test"
};
//let con = mysql.createConnection(dbconfig);

//
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    close() {

        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
                console.log("Database closed from class")
            } );
        } );
    }
}

// create instance of database
const database = new Database( dbconfig );

let dbExist, tableExist;

//implicitly check if database exist
database.query("SHOW DATABASES LIKE 'rhdb'")
.then((rows)=>{
    dbExist = rows;
    console.log("test db",dbExist.length);
    if(dbExist.length > 0){
        console.log("use db");
        database.query("USE rhdb");

    }
    else{
        console.log("create db")
        return database.query("CREATE DATABASE IF NOT EXISTS `rhdb`").then(rows =>{
            return database.query("USE rhdb");
            }
        );
    }
})
.then((rows)=>{
    return database.query("SHOW TABLES LIKE 'articles'");
})
.then((rows)=>{
    tableExist = rows;
    console.log("check if table exists",tableExist);
    if(tableExist.length<1){
        return database.query("CREATE TABLE articles (name VARCHAR(255), address VARCHAR(255))")
            .then(row=>{
                console.log("table created");
                database.close().then(()=>{
                    process.on('exit', function(code) {
                        return console.log(`exit node with code ${code}`);
                    });
                });
            });
    }
    else{
        console.log("table already existed");
        database.close().then(()=>{
            process.on('exit', function(code) {
                return console.log(`exit node with code ${code}`);
            });
        });
    }

})/*.then((rows)=>{
    tableExist = rows;
    if(tableExist){
        console.log("Table created successfully")
        return database.close();
    }});*/
//if databases does not exist
/*database.query("CREATE DATABASE IF NOT EXISTS `rhdb`", function (err, resolve) {
    if (err) throw err;
    console.log(resolve);
});*/

// test connection
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE IF NOT EXISTS `rhdb`", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});*//*.then(()=>{

});*//*.then(()=>{

})*/
//****mySQL-end****//