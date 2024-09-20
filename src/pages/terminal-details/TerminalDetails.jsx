import './TerminalDetails.css';
import Navbar from '../../components/navbar/Navbar';
import TransactionTable from '../../components/transaction-table/TransactionTable';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaRegEye, FaTimes } from "react-icons/fa";



const TerminalDetails = () => {

  const [rows, setRows] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetch('https://zaya.pythonanywhere.com/api/v1/terminals')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item, index) => ({
          id: index + 1, 
          terminalId: `${item['Terminal_ID']}`,
          agentName: item['Merchant_name'],
          region: item['Region'],
          lastSeen: item['Last_seen'],
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
    { field: 'id', headerName: 'SN', width: 90 },
    { field: 'terminalId', headerName: 'Terminal ID', width: 150 },
    { field: 'agentName', headerName: 'Merchant/Agent', width: 200 },
    { field: 'region', headerName: 'Region', width: 150 },
    { field: 'lastSeen', headerName: 'Last Seen', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div className={params.value === 'Inative' ? 'status-declined' : params.value === 'Active' ? 'status-approved' : ''}>
          {params.value === true ? 'Active' : 'Inactive'} 
        </div>
      ),
      headerClassName:"header-custom"
    },
    { field: 'report', headerName: 'Report', width: 130,
      renderCell: (params) => (
        <div className="review-cell" onClick={() => handleReviewClick(params)}>
          <FaRegEye style={{ marginRight: '8px' }} />
          <span>Review</span>
        </div>
      ),
    },
  ];

  return ( 
    <div className="terminal-detail">
      <Navbar header='Terminal Details' />

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
      {selectedAgent && (
        <div className="popups">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Terminal Information</h2>
              <div style={{padding: '10px 20px'}} className={selectedAgent['Status'] === 'Inative' ? 'status-declined' : selectedAgent['Status'] === 'Active' ? 'status-approved' : ''}>
                {selectedAgent['Status'] === 'Active' ? 'Active' : 'Inactive'} 
              </div>
              <FaTimes className="popup-close-icon" onClick={handleClosePopup} />
            </div>
            <div className="popup-body">
              <div>
                <p><strong>Merchant Name:</strong> {selectedAgent['Merchant_name']}</p>
                <p><strong>Merchant ID:</strong> {selectedAgent['Merchant_ID']}</p>
                <p><strong>Terminal ID:</strong> {selectedAgent['Terminal_ID']}</p>
                <p><strong>Last Seen:</strong> {selectedAgent['Last_seen']}</p>
                <p><strong>Region:</strong> {selectedAgent['Region']}</p>
                <p><strong>Location:</strong> {selectedAgent['location']}</p>
                <p><strong>Signal:</strong> Good</p>
                <p><strong>Date Created:</strong> 12/04/2020 00:00:00</p>
              </div>

              <div>
                
              </div>
              
              {/* Include other agent details here */}
            </div>
          </div>
        </div>
      )}
    </div>
   );
}
 
export default TerminalDetails;