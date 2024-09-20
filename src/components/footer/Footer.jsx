import './Footer.css';
import { BsBoxArrowRight } from "react-icons/bs";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const Footer = () => {
  return ( 
    <div className="footer">
      <BsBoxArrowRight className='logout-icon' />
      <Link to={'/'}>Log Out</Link>
    </div>  
   );
}
 
export default Footer;