
require('dotenv').config();

function server() {

  // Required libraries
  const express = require('express');
  const app = express();
  const http = require('http').createServer(app);


  
  // Globally used objects
  const helmet = require('helmet');
  const CONFIGURATION = require('./config');
  const cors = require('cors');
  const dbConnect = require('./db');
  const kafka = require('./kafka');


  // Socket Connection
  const io = require('socket.io')(http, { cors: { origins: "*" } });


  app.use(helmet());
  app.use(cors());

  // using all libraries
  app.use(express.json({ limit: '100000mb' }));
  app.use(express.urlencoded({ limit: '100000mb', extended: true }));

  app.use((req, res, next) => {
    console.log("__________________________________");
    console.log(`${new Date()} ${req.originalUrl}`);
    console.log(req.body);
    return next();
  });


  // Make io accessible to our router
  app.use((req, res, next) => {
    req.io = io;
    // req.httpsAgent = httpsAgent;
    next();
  });

  const routes = require('./router');
  app.use('/api/v1', routes);


  // error handling
  process.on('uncaughtException', (error) => {
    console.log(`ERROR: ${error.message}`);
  });

  
  //TODO: Remove later
  process.env.NODE_ENV = 'development';


  // default route
  app.get('/', (req, res) => {
    res.send(`Running mojo subscription environment: ${CONFIGURATION.NODE_ENV}`)
  });


  // return configurations
  return {
    app: http,
    configuration: CONFIGURATION
  };
}


// start server
const SERVER = server();

const serverInstance = SERVER.app.listen(SERVER.configuration.port, () => {
  console.log(`your app is running on ${SERVER.configuration.port}`);
});
