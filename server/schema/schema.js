const graphql = require("graphql");
const _ = require("lodash");

//lets set up some schema
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//develop type relations
//dummy data
let books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  {
    name: "To Kill a Mocking Bird",
    genre: "Historical",
    id: "2",
    authorId: "2"
  },
  { name: "Lord of Light", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Bunch of Junk", genre: "Fantasy", id: "4", authorId: "1" },
  {
    name: "Dance Off: The Biography",
    genre: "Historical",
    id: "5",
    authorId: "2"
  },
  { name: "Purge", genre: "Sci-Fi", id: "6", authorId: "2" }
];

let authors = [
  { name: "Bob Saget", age: 55, id: "1" },
  { name: "Charles Dickens", age: 1000, id: "2" },
  { name: "J.K. Rowling", age: 52, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

//how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from other db/source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
