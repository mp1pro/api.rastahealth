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

let dbExist;

//implicitly check if database exist
database.query("SHOW DATABASES LIKE 'rhdb'")
.then((rows)=>{
    console.log(rows)
    dbExist = rows;
    if(dbExist){
        console.log("Database closed because it already exist");
        return database.close();
    }
    else{
        console.log("Create rhdb database");
        return database.query("CREATE DATABASE IF NOT EXISTS `rhdb`");
    }
});
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