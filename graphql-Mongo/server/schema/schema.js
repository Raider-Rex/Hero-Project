const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const Hero = require('../models/hero');

const{
    GraphQLObjectType, 
    GraphQLString,
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull
} = graphql;


const HeroType = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        hero: {
            type:HeroType,
            args: {id: {type:GraphQLString}},
            resolve(parent, args){
                //return _.find(authors, {id: args.id});
                return Hero.findById(args.id)
            }
        },
        heroes: {
            type: new GraphQLList(HeroType),
            resolve(parent, args){
                //return heroes;
                return Hero.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
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
            }//use push to update da
        },
        deleteHero:{
            type: HeroType,
            args:{
                id: {type: GraphQLString}
            },
            async resolve(parent, args){
                await Hero.findById(args.id).remove().exec();
            }
        },
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

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

/* const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors,{id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id});
            }
        }
    })
}); */

/* const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book: {
            type:BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                // code to get db / other source
                //return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type:AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id: args.id});
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books;
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
                return Author.find();
            }
        }
    }
}); */

/* const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
    }
}); */

