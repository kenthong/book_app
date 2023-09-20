import { useState, useEffect } from "react";
import '../App';
import BookCard from "./BookCard";
import SearchIcon from "../search.svg";
import { useCallback } from 'react'
import GraphQLClient from '../api/GraphQLClient';
import { NetworkStatus, ApolloError, gql } from '@apollo/client';

const BookList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterby, setFilterby] = useState("");
    const [sortby, setSortby] = useState("");
    const [orderby, setOrderby] = useState("");
    const [books, setBooks] = useState([]);

    const searchBooks = useCallback(async () => {
      try {
        await GraphQLClient.query({
          query: gql`
                    query Books($search: String, $filterby: String, $sortby: String, $orderby: String) {
                      books(search: $search, filterby: $filterby, sortby: $sortby, orderby: $orderby) {
                        id
                        title
                        authors
                        description
                        image_url
                        rating
                        format
                      }
                    }
          `,
          variables: {
            search: searchTerm,
            filterby: filterby,
            sortby: sortby,
            orderby: orderby
          }
        })
        .then((result) => {
          if (result.networkStatus === NetworkStatus.ready) setBooks(result.data.books);
          if (result.networkStatus === NetworkStatus.error) console.log('NetworkStatus error:'.result.networkStatus);
        });
      } catch(error) {
        if (error instanceof ApolloError) {
          console.log('ApolloError:');
        }
        console.log(error);
      }
  },[searchTerm, filterby, sortby, orderby]);
  
  useEffect(() => {
    searchBooks();
  }, [searchBooks]);

    return (
        <div className="book-list">
          <div className="search">
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchBooks(searchTerm);
              }}
              placeholder="Search for books"
            />
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchBooks(searchTerm)}
            />
          </div>
          <div className="myselect" >
            <div>
            <select  id="filterby" name='filterby' title="filterby" onChange={(e) => {
                setFilterby(e.target.value);
                searchBooks();
              }}
              >
              <option value={filterby} defaultValue>Rating:</option>
              <option value="4">4 to 5</option>
              <option value="3">3 to 4</option>
              <option value="2">2 to 3</option>
              <option value="1">1 to 2</option>
            </select>
            </div>
            <div>
            <select  id="sortby" name='sortby' title="sortby" onChange={(e) => {
                setSortby(e.target.value);
                searchBooks();
              }}
              >
              <option value={sortby} defaultValue>Sort by</option>
              <option value="title">Title</option>
              <option value="authors">Author Name</option>
              <option value="rating">Rating</option>
            </select>
            </div>
            <div>
            <select  id="orderby" name='orderby' title="orderby" onChange={(e) => {
                setOrderby(e.target.value);
                searchBooks();
              }}
              >
              <option value={orderby} defaultValue>Order</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            </div>
          </div>
    
          {books?.length > 0 ? (
            <div className="container">
              {books.map((book, index) => (
                <BookCard book={book}  key={index}/>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No books found</h2>
            </div>
          )}
        </div>
    );
}

export default BookList;