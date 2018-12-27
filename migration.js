/**
 * Created by mp1pro on 12/27/18.
 */

//****mySQL****//
import mysql from 'mysql';

// conect to mysql
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test"
});

// test connection
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE IF NOT EXISTS `rhdb`", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});/*.then(()=>{

});*//*.then(()=>{

})*/
//****mySQL-end****//