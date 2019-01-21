const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.options('localhost:4200', cors());
mongoose.connect('mongodb://admin1:password01@ds157574.mlab.com:57574/hero');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql',cors(), graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('now listening to requests on port 4000')
});