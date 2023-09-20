import '../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <div className='navbar'>
        <ul className='nvbar'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reserved">Reserved</Link></li>
        </ul>
    </div>
    );
  }
  
export default Navbar;