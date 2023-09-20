import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';

const bookObjs = JSON.parse(fs.readFileSync('book_db.json'));
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    authors: String
    description: String
    format: String
    rating: String
    image_url: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(search: String
          filterby: String
          sortby: String
          orderby: String): [Book]
    book(id: ID!): Book
  }
`;

const books = bookObjs.filter((item)=>{
        if (
            item.id !== undefined && 
            item.title !== undefined &&
            item.authors !== undefined &&
            item.rating !== undefined &&
            item.image_url !== undefined 
        ) {
            return true;
        } else {
            return false;
        }
    });

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}
const resolvers = {
    Query: {
      books: (parent, args, contextValue, info) => {
          let book_rs = books;
          if (args.hasOwnProperty('search') && args.search !== "") {
            book_rs = book_rs.filter((obj) => JSON.stringify(obj).toLowerCase().includes(args.search.toLowerCase()));
          }
          if (args.hasOwnProperty('filterby') && args.filterby !== "") {
            book_rs = book_rs.filter((obj) => {
              return parseFloat(obj.rating) >= parseFloat(args.filterby) && parseFloat(obj.rating) < parseFloat(args.filterby) + 1
            });
          }
          if (args.hasOwnProperty('sortby') && args.sortby !== ""){
            if (args.hasOwnProperty('orderby') && args.orderby === "desc"){
              return book_rs.sort(dynamicSort('-' + args.sortby));  
            }
            return book_rs.sort(dynamicSort(args.sortby));
          }
          return book_rs;
      },
      book(parent, args, contextValue, info) {
        return books.find((book) => {
          return book.id == args.id;
        });
      },
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 , host : '127.0.0.1' },
  });
  
  console.log(`ApolloServer ready at: ${url}`);