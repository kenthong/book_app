import { useAppContext } from "./context/appContext"; 
import { useNavigate } from "react-router-dom/dist";


const BookCard = ({ book }) => {
  const { reserved, addReserved, removeReserved } = useAppContext();
  const reservedChecker = (id) => {
    const isreserved = reserved.some((book) => book.id === id);
    return isreserved;
  }
  const navigate = useNavigate();

  return (
    <div key={book.id}>
      <div className="book" >
        <div>
          <p>Rating: {book.rating}</p>
        </div>
            <div>
                <img src={book.image_url !== "" ? book.image_url : "https://via.placeholder.com/400"} alt={book.title} onClick={() => navigate(`/book/${book.id}`)}/>
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
  );
}

export default BookCard;