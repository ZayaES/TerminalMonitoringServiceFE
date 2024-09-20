import "./Sidebar.css";
import Footer from "../footer/Footer";
import naira from '../../assets/NairaSign.png';
import grid from '../../assets/grid.png'
import store from '../../assets/store.png'
import cards from '../../assets/cards.png'
import pos from '../../assets/pos.png'
import setting from '../../assets/settings.png'
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return ( 
    <div className="sidebar">
      <div>
        <div className="sidebar-title">
          <div className="title-top">
            <img src={naira} alt="" />
            <h2>Genesis</h2>
          </div>
          <p>Seamless, Secure</p>
        </div>

        <div className="sidebar-items">
          <div className="side-item">
            <BsFillGridFill style={{color: '#fff'}} />
            <Link to={'/dashboard'}>Dashboard</Link>
          </div>
          <div className="side-item">
            <img src={store} alt="" />
            <Link to={'/merchantdetails'}>Merchants</Link>
          </div>
          <div className="side-item">
            <img src={naira} alt="" />
            <Link to={'/agentdetails'}>Agents</Link>
          </div>
          <div className="side-item">
            <img src={cards} alt="" />
            <Link to={'history'}>Transactions</Link>
          </div>
          <div className="side-item">
            <img src={pos} alt="" />
            <Link to={'terminaldetails'}>Terminals</Link>
          </div>
          <div className="side-item">
            <img src={cards} alt="" />
            <Link to={'/chargeback'}>Chargeback</Link>
          </div>
          {/* <div className="side-item">
            <img src={setting} alt="" />
            <a href="#">Settings</a>
          </div> */}
        </div>
      </div>
      
      <Footer />
      
    </div>
   );
}
 
export default Sidebar;