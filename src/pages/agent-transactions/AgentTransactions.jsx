import './AgentTransactions.css'
import Navbar from '../../components/navbar/Navbar';
import TransactionTable from '../../components/transaction-table/TransactionTable';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaRegEye, FaTimes } from "react-icons/fa";


const AgentTransactions = () => {

  const [rows, setRows] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetch('https://zaya.pythonanywhere.com/api/v1/transactions/role=agents')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item, index) => ({
          id: index + 1, 
          transId: `${item['Transaction Reference']}`,
          amount: item['Transaction Amount'],
          transactionDate: item['Date Logged'],
          agentName: item['Agent Name'],
          region: item['Region'],
          terminalId: item['Terminal ID'],
          status: item['Status'],
          fullInfo: item // Store the complete agent information
        }));
        setRows(transformedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleReviewClick = (params) => {
    setSelectedAgent(params.row.fullInfo); // Set the selected agent data
  };

  const handleClosePopup = () => {
    setSelectedAgent(null); // Close the popup
  };

  const columns = [
    { field: 'id', headerName: 'SN', width: 50 },
    { field: 'transId', headerName: 'Transaction Ref', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'transactionDate', headerName: 'Transaction Date',  width: 150 },
    { field: 'terminalId', headerName: 'Terminal ID', width: 100 },
    { field: 'agentName', headerName: 'Agent Name', width: 150 },
    { field: 'region', headerName: 'Region', width: 80 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div style={{padding: '5px 20px'}} className={params.value === 'Unsuccessful' ? 'status-declined' : params.value === 'Successful' ? 'status-approved' : ''}>
          {params.value === 'Successful' ? 'Successful' : 'Unsuccessful'} 
        </div>
      ),
      headerClassName:"header-custom"
    },
    { field: 'report', headerName: 'Report', width: 110,
      renderCell: (params) => (
        <div className="review-cell" onClick={() => handleReviewClick(params)}>
          <FaRegEye style={{ marginRight: '8px' }} />
          <span>Review</span>
        </div>
      ),
    },
  ];


  return ( 
    <div className="agent-transactions">
      <Navbar header='Agent Transactions' />
      <div className="agent-header">
        <Link to={'/history'}>Merchant Transactions</Link>
        <Link to={'/agenttransactions'}>Agent Transactions</Link>
      </div>
      <h2>Agent Transactions</h2>
      
      <div className="table-grid-cont">
        <DataGrid
          className='data-grid'
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { 
              paginationModel: { 
                pageSize: 6,
              },
            },
          }}
          slots={{toolbar: GridToolbar}}
          slotProps={{
            toolbar : {
              showQuickFilter : true,
              quickFilterProps : { debounceMs : 500},
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </div>
      {selectedAgent && (
        <div className="popups">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Merchant Transaction Information</h2>
              <div style={{padding: '10px 20px'}} className={selectedAgent['Status'] === 'Unsuccessful' ? 'status-declined' : selectedAgent['Status'] === 'Successful' ? 'status-approved' : ''}>
                {selectedAgent['Status'] === 'Successful' ? 'Successful' : 'Unsuccessful'} 
              </div>
              <FaTimes className="popup-close-icon" onClick={handleClosePopup} />
            </div>
            <div className="popup-body">
              <div>
                <p><strong>Bank Share:</strong> {selectedAgent['Bank Share']}</p>
                <p><strong>Cluster Code:</strong> {selectedAgent['Cluster Code']}</p>
                <p><strong>Date Logged:</strong> {selectedAgent['Date Logged']}</p>
                <p><strong>Merchant Category:</strong> {selectedAgent['Agent Category']}</p>
                <p><strong>Merchant Cluster Manager:</strong> {selectedAgent['Agent Cluster Manager']}</p>
                <p><strong>Merchant Name:</strong> {selectedAgent['Agent Name']}</p>
                <p><strong>Merchant Network Manager:</strong> {selectedAgent['Agent Network Manager']}</p>
                <p><strong>Merchant Phone Number:</strong> {selectedAgent['Agent Phone Number']}</p>
              </div>

              <div>
                <p><strong>Merchant Share:</strong> {selectedAgent['Agent Share']}</p>
                <p><strong>Region:</strong> {selectedAgent['Region']}</p>
                <p><strong>Terminal ID:</strong> {selectedAgent['Terminal ID']}</p>
                <p><strong>Transaction Amount:</strong> {selectedAgent['Transaction Amount']}</p>
                <p><strong>Transaction Reference:</strong> {selectedAgent['Transaction Reference']}</p>
              </div>
              
              {/* Include other agent details here */}
            </div>
          </div>
        </div>
      )}
    </div>
   );
}
 
export default AgentTransactions;