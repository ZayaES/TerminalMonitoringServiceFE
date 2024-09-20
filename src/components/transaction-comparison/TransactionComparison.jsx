import './TransactionComparison.css'
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const TransactionComparison = ({ completedTransactions, failedTransactions }) => {
  
  const totalTransactions = completedTransactions + failedTransactions
  const completedPercentage = (completedTransactions / totalTransactions) * 100;
  const failedPercentage = (failedTransactions / totalTransactions) * 100;
  const completedLeftover = 100 - completedPercentage;
  const failedLeftover = 100 - failedPercentage;

  return (
    <div className='transaction-comparison'>
      <div className="terminals">
        <h4>Terminals</h4>
        {/* <select name="duration" id="duration">
          <option value="this week">This Week</option>
          <option value="this month">This Month</option>
          <option value="this year">This Year</option>
        </select> */}
      </div>

      <div className="terminal-details">
        <div className="terminal-details-label">
          <FaCircleCheck className='active-check' />
          <div className="terminal-details-text">
            <h5>Active Terminals</h5>
            <span>weekly active terminals</span>
          </div>
        </div>
        <h4>{completedTransactions}</h4>
      </div>

      <div className="completedTrans" >
        <div style={{ backgroundColor: 'green', height: '100%', borderRadius:'10px 0 0 10px', width: `${completedPercentage}%`}}></div>
        <div style={{ backgroundColor: 'rgb(202, 200, 200)', height: '100%', borderRadius:'0 10px 10px 0', width: `${completedLeftover}%`}}></div>
      </div>
      
      <div className="terminal-details">
        <div className="terminal-details-label">
          <MdCancel className='failed-check' />
          <div className="terminal-details-text">
            <h5>Inactive Terminals</h5>
            <span>weekly inactive terminals</span>
          </div>
        </div>
        <h4>{failedTransactions}</h4>
      </div>

      <div className="failedTrans">
        <div style={{ backgroundColor: 'red', height: '100%', borderRadius:'10px 0 0 10px', width: `${failedPercentage}%`}}></div>
        <div style={{ backgroundColor: 'rgb(202, 200, 200)', height: '100%', borderRadius:'0 10px 10px 0', width: `${failedLeftover}%`}}></div>
      </div>
    </div>
  );
};

export default TransactionComparison;
