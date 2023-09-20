## book_app
This book applications using React and GraphQL.

This application  allow users to:

1. View a list of books with their names, authors, and descriptions.

2. Filter books by some field.

3. Search for books by name or description.

4. View detailed information about a selected book.

5. Reserve a book.


## Dependencies
1: A recent version Node.js installed

2: A recent version npm installed


## This book applications have two part:
## 1: GraphQL server part
This book app mock GraphQL server is base on Apollo Server
https://www.apollographql.com/docs/apollo-server/

The books data sample is downloaded from 
https://example-data.draftbit.com/books

It just for demo or development.
It allow the user using GraphQL to search, filter, sort the book data.


The code is under book_app_server.
Read the book_app_server/README.md before star the GraphQL server.
[book_app_server/README.md](book_app_server/README.md)

## 2: Book application client part
The clinet part is base on React.
Read the book_app_client/README.md before star the book app.
[book_app_client/README.md](book_app_client/README.md)


## Important notice
The mock GraphQL server is  listen on localhost port 4000.
So the Book app client must run on same host as this mock GraphQL server to access the data.
This mock GraphQL server and the Book application client only tested on Windows 10  and Ubuntu 22 environment.
