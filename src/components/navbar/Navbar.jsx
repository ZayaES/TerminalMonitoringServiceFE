import './Navbar.css';
import { IoIosNotifications } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { LuChevronDownSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';


const Navbar = ({fullName = 'Tutu Isaiah', header = 'Dashboard Terminal', subHeader}) => {

  const getInitials = (name) => {
    return name
      .split(' ') 
      .map(word => word.charAt(0))
      .join('');
  };

  const initials = fullName ? getInitials(fullName) : 'N/A';

  return ( 
    <div className="navbar">
      <div className="nav-header">
        <h2>{header}</h2>
        <span>{subHeader}</span>
      </div>

      <div className="nav-body">
        <GoQuestion className='icon' />
        <IoIosNotifications className='icon' />
        <p className='initials'>{initials}</p>
        <p>Tutu Isaiah</p>
        <div className="dropdown">
          <LuChevronDownSquare className='icon' />
          <div className="dropdown-menu">
            <a href="#">Edit Profile</a>
            <a href="#">User Preferences</a>
            <Link to={'/login'}>Log Out</Link>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Navbar;