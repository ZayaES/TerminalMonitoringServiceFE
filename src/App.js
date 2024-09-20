import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import TransactionHistory from './pages/transaction-history/TransactionHistory';
import Chargeback from './pages/chargeback/Chargeback';
import AgentTransactions from './pages/agent-transactions/AgentTransactions';
import MerchantDetails from './pages/merchant-details/MerchantDetails';
import AgentDetails from './pages/agent-details/AgentDetails';
import TerminalDetails from './pages/terminal-details/TerminalDetails';

function App() {

  const Layout = () => {
    return(
      <div className="main">
        <div className="container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      // path: "/",
      element: <Layout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/history',
          element: <TransactionHistory />
        },
        {
          path: '/chargeback',
          element: <Chargeback />
        },
        {
          path: '/agenttransactions',
          element: <AgentTransactions />
        },
        {
          path: '/merchantdetails',
          element: <MerchantDetails />
        },
        {
          path: '/agentdetails',
          element: <AgentDetails />
        },
        {
          path: '/terminaldetails',
          element: <TerminalDetails />
        },
      ]
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
