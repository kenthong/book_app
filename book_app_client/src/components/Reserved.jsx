import '../App';
import BookCard from "./BookCard";
import { useAppContext } from "./context/appContext"; 

const Reserved = () => {
    const { reserved } = useAppContext();
        return (
        <div className="book-list">
          {reserved.length > 0 ? (
            <div className="container">
              {reserved.map((book, index) => (
                <BookCard book={book} key={index}/>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Reserved book found</h2>
            </div>
          )}
        </div>
    );
  }
  
  export default Reserved;