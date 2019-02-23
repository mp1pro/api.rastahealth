// add express
import express from 'express';

// Set up the express app
const app = express();

// add body-parser to interpret post requests
import bodyParser from 'body-parser';

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port
const port = 8082;

// set hostname
const hostname = 'localhost';

// get an instance of the express Router
let router = express.Router();

// register the router so it can be used
app.use('/', router);

//import the database
import db from './models/db';

//import the schema
//import todo from './models/schema';

//initiate count
let count = 0;


//****mySQL****//
import mysql from 'mysql';

// conect to mysql
// conect to mysql

//create config schema
let dbconfig = {
    host: "localhost",
    user: "root",
    password: "test"
};
//let con = mysql.createConnection(dbconfig);

// class Database Promise
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

//****mySQL-end****//

// also use routes for users
// make route post for users /:admin

// test route to make sure everything is working (accessed at GET http://localhost:8082/articles)
router.get('/articles', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    //res.send('HELLO WORLD TEST1\n');

    // get with article /:params
    // fetch article in mysql
    // return article
    // ensure its in json format
    // send data
    
    let getArticles = `SELECT * FROM articles`;

    database.query("USE rhdb")
    .then((rows)=> {
        return database.query(getArticles)
    })
    .then((rows,err)=>{
        if (err) throw err;
        console.log("rows returned");

        return res.status(201).send({
            success: 'true',
            message: 'articles retrieved successfully',
            articles: rows
        })
    });
    /*res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })*/
});

// get single article with GET url http://localhost:8082/articles/:title
router.get('/articles/:title', function(req, res) {

    //grab title from params
    let title = req.params.title;
    console.log('title = ',title);

    let getArticle = `SELECT * FROM articles WHERE post_title='${title}'`;

    database.query("USE rhdb")
        .then((rows)=> {
            return database.query(getArticle)
        })
        .then((rows,err)=>{
            if (err) throw err;
            console.log("single row returned");

            return res.status(201).send({
                success: 'true',
                message: 'article retrieved successfully',
                articles: rows
            })
        });
});

//test post requests by adding todos
router.post('/addArticle/:title', (req, res) => {
    // add articles
    // confirm post data
    // then insert into mysql articles table
    // send success
    //console.log(req);

    /*if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }*/

/*    const todo = {
        // return id # based on db length
        id: db.length + 1,
        //param title
        ptitle: req.params.title,
        // grab title
        title: req.body.title,
        // grab description
        description: req.body.description
    };*/

    const articles = {
        // return id # based on db length
        id: db.length + 1,
        //param title
        ptitle: req.params.title,
        // grab title
        post_title: req.body.post_title,
        // grab summary
        // calculate summary from post content
        summary: req.body.summary,
        // grab post_content
        post_content: req.body.post_content,
        // grab post_type
        post_type: req.body.post_type,
        //grab date
        // calculate date here maybe
        date: req.body.date,

        test: 'tester4'
    };

    // push the to-do to the db
    //db.push(articles);
    //sql insert
    let inArticle = `INSERT INTO articles (
                            post_status, 
                            post_title, 
                            summary, 
                            post_content, 
                            post_type, 
                            date
                        ) 
                        VALUES (
                            DEFAULT, 
                            "${req.params.title}",
                            "${req.body.summary}",
                            "${req.body.post_content}",
                            DEFAULT,
                            NOW()
                        )`;
    database.query("USE rhdb")
    .then((rows)=> {
        return database.query(inArticle)
    })
    .then((rows,err)=>{
        if (err) throw err;
        console.log("1 record inserted");

        return res.status(201).send({
            success: 'true',
            message: 'article added successfully',
            articles
        })
    });
    /*if(req) {
        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            todo
        })
    }*/
});

// delete based on id #
router.delete('/delete/:title', (req, res) => {

    // find article and delete from articles mysql
    let title = req.params.title;

    let delArticle = `DELETE FROM articles WHERE post_title='${title}'`;

    database.query("USE rhdb")
        .then((rows)=> {
            return database.query(delArticle)
        })
        .then((rows,err)=>{
            if (err) throw err;
            console.log("Number of records deleted: " + rows.affectedRows);

            return res.status(201).send({
                success: 'true',
                message: 'article delete successfully',
                articles: []
            })
        });
/*    //grab id as a number
    const id = parseInt(req.params.id, 10);

    // loop through db to find id #
    db.map((todo,index)=>{
        if(todo.id===id){
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Todo deleted successfuly',
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'todo not found',
    });*/

});

// update info based on id #
router.put('/editArticle/:title', (req, res) => {

    //grab title from params
    let title = req.params.title;
    //console.log('title up = ',title);

    if(req.body.post_status === ''){console.log('empty');}

    const articles = {
        //post_status
        post_status: req.body.post_status,
        // grab title
        post_title: req.params.title,
        // grab summary
        // calculate summary from post content
        summary: req.body.summary,
        // grab post_content
        post_content: req.body.post_content,
        // grab post_type
        post_type: req.body.post_type,
        //grab date
        // calculate date here maybe
        date: req.body.date,
        // last update
        last_updated: req.body.last_updated
    };

    //CREATE string FROM OBJECT WITH NON EMPTY VALUES

    let conVert = (object) => {
        let entries = Object.entries(object);
        //entries=entries.toString();
        let enString = '';
        let entry = '';

        const len = entries.length;
        for(let x = 0; x<len; x++){

            if(Number(entries[x][1])){
                console.log(entries[x][1]);
                entry = `${entries[x][1]}`
            }
            else{
                entry = `'${entries[x][1]}'`
            }

            //console.log(`${entries[x][0]} = ${entries[x][1]}`);
            let string = `${entries[x][0]} = ${entry},`;

            if(entries[x][1]){
                enString += string;
            }

        }
        enString = enString.slice(0,-1);
        //console.log(enString)

        return enString;
    }

    //ref https://www.sitepoint.com/community/t/update-mysql-database-and-skip-empty-fields/247378

    //COALESCE(${articles.post_status}, post_status)
    //console.log('num up = ',articles.post_status);
    console.log(conVert(articles));

    let upArticle = `UPDATE articles 
                        SET 
                            ${conVert(articles)}
                            ,last_updated = NOW()
                        WHERE 
                            post_title='${title}'`;

    database.query("USE rhdb")
        .then((rows)=> {
            return database.query(upArticle)
        })
        .then((rows,err)=>{
            if (err) throw err;
            //console.log("row updated");
            console.log(rows.affectedRows + " record(s) updated");

            return res.status(201).send({
                success: 'true',
                message: 'update done successfully',
                updatedTodo: articles
            })
        });
    // use article name as /:param
    // find article
    // update fields
    // return confirmation

    //grab id as a number
    //const id = parseInt(req.params.id, 10);

    // grab title param
    /*
     post_title = ,
     summary,
     post_content,
     post_type,
     date,
     last_updated


    let title = "${req.params.title}";
    let editArticle =`UPDATE articles SET 
        post_status = DEFAULT, 
        position = "${req.position}",
        wage = "${req.wage}", 
        is_current_employee = "${req.isCurrentEmployee}"
    WHERE title = ${req.params.title}` ;



    let todoFound;
    let itemIndex;

    //loop through all todos
    db.map((todo,index)=>{
        if(todo.id === id){
            todoFound = todo;
            itemIndex = index;
        }
    });

    // check if to do exist
    if (!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });
    }

    // check if each item in to-do exist
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    }

    // updated to-do schema
    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    // update to-do
    db.splice(itemIndex, 1, updatedTodo);

    // return success
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedTodo,
    });*/
});

// START THE SERVER
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//node server
/*const http = require('http');

const hostname = 'localhost';
const port = 8082;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

