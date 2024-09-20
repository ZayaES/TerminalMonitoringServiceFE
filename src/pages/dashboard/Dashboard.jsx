import './Dashboard.css'
import { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../../components/navbar/Navbar';
import naira from '../../assets/NairaSign.png'
import success from '../../assets/success.png'
import greenArrow from '../../assets/greenArrow.png'
import redArrow from '../../assets/redArrow.png'
import { CgCheckR } from "react-icons/cg";
import { TbChecklist } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { CgPlayListRemove } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { data } from '../../data';
import TransactionComparison from '../../components/transaction-comparison/TransactionComparison';
import axios from 'axios';


const Dashboard = () => {

  const [totalTerminals, setTotalTerminals] = useState();
  const [successfulTransactions, setSuccessfulTransactions] = useState();
  const [failedTransactions, setFailedTransactions] = useState();
  const [activeTerminals, setActiveTerminals] = useState();
  const [inactiveTerminals, setInactiveTerminals] = useState();

  useEffect(() => {
    // Function to make the API calls
    const fetchData = async () => {
        try {
            // Make API calls using Axios
            const terminalsResponse = await axios.get('https://zaya.pythonanywhere.com/api/v1/terminals/total');
            const successfulTransactionsResponse = await axios.get('https://zaya.pythonanywhere.com/api/v1/transactions/countbystatus=successful');
            const failedTransactionsResponse = await axios.get('https://zaya.pythonanywhere.com/api/v1/transactions/countbystatus=unsuccessful');
            const activeTerminalsResponse = await axios.get('https://zaya.pythonanywhere.com/api/v1/terminals/countbystatus=active');
            const inactiveTerminalsResponse = await axios.get('https://zaya.pythonanywhere.com/api/v1/terminals/countbystatus=inactive');


            // Set state with data from responses
            setTotalTerminals(terminalsResponse.data);
            setSuccessfulTransactions(successfulTransactionsResponse.data)
            setFailedTransactions(failedTransactionsResponse.data)
            setActiveTerminals(activeTerminalsResponse.data)
            setInactiveTerminals(inactiveTerminalsResponse.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Specify empty dependency array to ensure this effect runs only once
  }, []);
  return ( 
    <div className="dashboard">
      
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-boxes">
          <div className="box box1">
            <div className="box-icons">
              <GoChecklist className='success-check' />
              <div className="increase">
                <img src={greenArrow} alt="" />
                <span>2.3%</span>
              </div>
            </div>

            <h1>{successfulTransactions}</h1>
            <p>Successful Transactions</p>
          </div>


          <div className="box box2">
            <div className="box-icons">
              <CgPlayListRemove className='failure-check' />
              <div className="decrease">
                <img src={redArrow} alt="" />
                <span>1.2%</span>
              </div>
            </div>

              <h1>{failedTransactions}</h1>
              <p>Failed Transactions</p>
          </div>


          <div className="box box3">
            <div className="box-icons">
              <RiFileList2Line className='total-check' />
            </div>

            <h1>{totalTerminals}</h1>
            <p>Total Number of Terminals</p>
          </div>
          <div className="box box4">
            <div className="box4-header">
              <p>Transactions</p>
              {/* <select name="duration" id="duration">
                <option value="this week">This Week</option>
                <option value="this month">This Month</option>
                <option value="this year">This Year</option>
              </select> */}
            </div>
            <ResponsiveContainer width="100%" height="95%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
                barSize={20}>
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis 
                    domain={[0, 6000]}
                    tickCount={7} 
                    tickFormatter={value => `${value / 1000}k`}
                  />
                  <Tooltip />
                  {/* <Legend /> */}
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Bar dataKey="Transactions" fill="#151515" />
                </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="box box5">
            <TransactionComparison completedTransactions={activeTerminals} failedTransactions={inactiveTerminals} />

          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Dashboard;