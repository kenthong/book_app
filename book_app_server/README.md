## Introduction
This book app mock GraphQL server is base on Apollo Server
https://www.apollographql.com/docs/apollo-server/

The books data sample is downloaded from 
https://example-data.draftbit.com/books

It just for demo or development.
It allow the user using GraphQL to search, filter, sort the book data.

## before start 
This book_app_server needs a recent version Node.js installed

To install the Node.js, you can use Node Version Manager (nvm)

https://github.com/nvm-sh/nvm

https://nodejs.org/en

To install the lts Node.js

nvm install --lts

run "node -v" to check node is installed

node -v

v18.18.0

run "npm -v" to check npm is installed


## Install dependencies
before start this  mock GraphQL server, it need to install dependencies:

run follow cmd in cli:
cd book_app_server
npm i

## now start this mock GraphQL server for book app
npm start

## Available Scripts

In the book_app_server directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

Test the GraphQL query like in the browser:
'query Books($search: String, $sortby: String, $orderby: String, $filterby: String) {
  books(search: $search, sortby: $sortby, orderby: $orderby, filterby: $filterby) {
    id
    title
    authors
    description
    image_url
    rating
    format
  }
}'

`{
  "search": "",
  "sortby": "rating",
  "orderby": "desc",
  "filterby": "4",
}`

![GraphQL query sample](img/server.PNG)

## Important notice
The mock GraphQL server is listen on localhost port 4000.
So the Book app client must run on same host as this mock GraphQL server to access the data.

To make the mock GraphQL server run on a separate host, you can change the host in the 

[book_app_server/index.js](index.js)

from 

host : '127.0.0.1'  to  host : '0.0.0.0'

Let the mock GraphQL server linsten on a public IP. 

At the same time make sure you open the port 4000 on the firewall. 

So We can access the data from outside.

And We also need to change the GraphQL server API URI in the Book app client :


[book_app_client/src/api/GraphQLClient.js](../book_app_client/src/api/GraphQLClient.js)

uri: 'http://localhost:4000/' 

Change the 'localhost' to your public IP.

This was only tested on Windows 10  and Ubuntu 22 environment.

