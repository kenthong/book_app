import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./context/appContext"; 
import GraphQLClient from '../api/GraphQLClient';
import { NetworkStatus, ApolloError, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom/dist";

const BookDetails = () => {
  const navigate = useNavigate();
  const { reserved, addReserved, removeReserved } = useAppContext();
  const reservedChecker = (id) => {
    const isreserved = reserved.some((book) => book.id === id);
    return isreserved;
  }
  const [book, setBook] = useState([]);
  const bookId = useParams();
  useEffect(() => {
      const gethBook = async (id) => {
        try {
          await GraphQLClient.query({
            query: gql`
              query Book($bookId: ID!) {
                book(id: $bookId) {
                  id
                  title
                  authors
                  description
                  format
                  rating
                  image_url
                }
              }
            `,
            variables: {
              bookId: id
            }
          })
          .then((result) => {
            if (result.networkStatus === NetworkStatus.ready) setBook(result.data.book);
            if (result.networkStatus === NetworkStatus.error) console.log('NetworkStatus error:'.result.networkStatus);
          });
        } catch(error) {
          if (error instanceof ApolloError) {
            console.log('ApolloError');
          }
          console.log(error);
        }
    };
    gethBook(bookId.id);
  },[bookId.id]);

  return (
    <div>
      {
        Object.keys(book).length > 0 ? (
          <div className="book-details">
            <div>
              <div className="book" >
                <div>
                  <p>Rating: {book.rating}</p>
                </div>
                <div>
                    <img src={book.image_url !== "" ? book.image_url : "https://via.placeholder.com/400"} alt={book.title} />
                </div>
                <div>
                  <span>{book.authors}</span>
                  <h3>{book.title}</h3>
                </div>
              </div>
              <div className='fabtn'>
                {reservedChecker(book.id) ? (
                    <button className='btn' onClick={() => removeReserved(book.id)} >Remove from Reserved</button>
                  ) : (
                    <button className='btn' onClick={() => addReserved(book)} >Reserve</button>
                  )
                }
              </div>
            </div>
            <div>
              <p className="book-des">{book.description}</p>
            </div>
            <div className='backbtn'>
              <button className='btn2' onClick={() => navigate(-1)}>Go Back</button>
            </div>
          </div>
        ) : (
          <div className="empty">
              <h2>Book not found</h2>
          </div>
        )}
    </div>
  );
}

export default BookDetails;