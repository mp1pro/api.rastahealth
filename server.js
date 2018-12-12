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

// test route to make sure everything is working (accessed at GET http://localhost:8082)
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    //res.send('HELLO WORLD TEST1\n');
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});

//test post requests by adding todos
router.post('/addTodo', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    let count = {
        nexttodoId: 1
    };

    const todo = {
        id: count.nexttodoId++,
        title: req.body.title,
        description: req.body.description
    }
    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
    })
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

