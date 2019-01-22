/*
* Defines the Queries and Mutations to be used by GraphQL against our database.
*/

const graphql = require('graphql');
const Hero = require('../models/hero');

const{
    GraphQLObjectType, 
    GraphQLString,
     GraphQLSchema,
     GraphQLList,
     GraphQLNonNull
} = graphql;

//Defines the types of the hero 
const HeroType = new GraphQLObjectType({
    name: 'Hero',
    // Defines the attributes contained within the fields of the hero.
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});

// Creating the queries for GraphQL.
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        // Returns a single hero
        hero: {
            // Defines the type of query.
            type:HeroType,
            // Defines the argument of the query.
            args: {id: {type:GraphQLString}},
            // Defines the functionality of the query.
            resolve(parent, args){
                return Hero.findById(args.id)
            }
        },
        // Returns an array of all heroes.
        heroes: {
            type: new GraphQLList(HeroType),
            resolve(parent, args){
                return Hero.find();
            }
        }
    }
});

// Creating the mutations for GraphQL
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Adds a hero to the database.
        addHero:{
            type: HeroType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let hero = new Hero({
                    name: args.name,
                });
                return hero.save();
            }
        },
        // Deletes a hero from the database.
        deleteHero:{
            type: HeroType,
            args:{
                id: {type: GraphQLString}
            },
            //Async - creates a promise that is sent and allows the code to continue executing normally (may take a long time if you have to wait for it)
            async resolve(parent, args){
                await Hero.findById(args.id).remove().exec();
            }
        },
        // Updates a hero's name.
        updateHero:{
            type: HeroType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parents, args){
                let hero = await Hero.findById(args.id);
                hero.name = args.name;
                return hero.save();
            }
        }
    }
});

// Exporting the Queries and Mutations
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});