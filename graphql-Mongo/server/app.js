/*
* Setting up the server for the backend.
*/

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

// The app object is instantiated on creation of the Express server.
const app = express();
// Creates permission to let the localhost:4200 have access to the resources of the server.
app.options('localhost:4200', cors());
// Uses mongoose as the intermediary between GraphQL and MongoDb.
// Creating a connection to the MongoDB using the URL.
mongoose.connect('mongodb://admin1:password01@ds157574.mlab.com:57574/hero');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

// Adds the middleware layer to the Express middleware stack.
app.use('/graphql',cors(), graphqlHTTP({
    schema,
    graphiql: true
}));

// Creates an HTTP server and returns the instance.
app.listen(4000, () => {
    console.log('now listening to requests on port 4000')
});