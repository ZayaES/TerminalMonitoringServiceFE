import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './AgentDetails.css';
import Navbar from '../../components/navbar/Navbar';
import { FaRegEye, FaTimes } from "react-icons/fa";

const AgentDetails = () => {
  const [rows, setRows] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetch('https://zaya.pythonanywhere.com/api/v1/agents')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item, index) => ({
          id: index + 1, 
          agentName: `${item['Other Names']} ${item['Last Name']}`,
          phoneNumber: item['Phone Number'],
          terminalId: item['Terminal ID'],
          state: item['State'],
          created: item['Date Created'],
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
    { field: 'id', headerName: 'SN', width: 80 },
    { field: 'agentName', headerName: 'Agent Name', width: 190 },
    { field: 'phoneNumber', headerName: 'Agent Phone Number', type: 'number', width: 150 },
    { field: 'terminalId', headerName: 'Terminal ID', width: 130 },
    { field: 'state', headerName: 'State', width: 120 },
    { field: 'created', headerName: 'Created', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <div className={params.value === false ? 'status-declined' : params.value === true ? 'status-approved' : ''}>
          {params.value === true ? 'Active' : 'Inactive'} 
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
    <div className="agent-details">
      <Navbar header='Agent Details' />

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
              <h2>Agent Information</h2>
              <div style={{padding: '10px 20px'}} className={selectedAgent['Status'] === false ? 'status-declined' : selectedAgent['Status'] === true ? 'status-approved' : ''}>
                {selectedAgent['Status'] === true ? 'Active' : 'Inactive'} 
              </div>
              <FaTimes className="popup-close-icon" onClick={handleClosePopup} />
            </div>
            <div className="popup-body">
              <div>
                <p><strong>Last Name:</strong> {selectedAgent['Last Name']}</p>
                <p><strong>Other Name:</strong> {selectedAgent['Other Names']}</p>
                <p><strong>Phone Number:</strong> {selectedAgent['Phone Number']}</p>
                <p><strong>Terminal ID:</strong> {selectedAgent['Terminal ID']}</p>
                <p><strong>Date Created:</strong> {selectedAgent['Date Created']}</p>
                <p><strong>Date Activated:</strong> {selectedAgent['Date Activated']}</p>
                <p><strong>Account Number:</strong> {selectedAgent['Income Account']}</p>
                <p><strong>Email:</strong> {selectedAgent['Email']}</p>
              </div>

              <div>
                <p><strong>BVN:</strong> {selectedAgent['BVN']}</p>
                <p><strong>Category:</strong> {selectedAgent['Category']}</p>
                <p><strong>Address:</strong> {selectedAgent['Address']}</p>
                <p><strong>State:</strong> {selectedAgent['State']}</p>
                <p><strong>LGA:</strong> {selectedAgent['LGA']}</p>
                <p><strong>ANM:</strong> {selectedAgent['ANM']}</p>
                <p><strong>Cluster:</strong> {selectedAgent['Cluster']}</p>
                <p><strong>Cluster Code:</strong> {selectedAgent['Cluster Code']}</p>
                <p><strong>Cluster Manager:</strong> {selectedAgent['Cluster Manager']}</p>
              </div>
              
              {/* Include other agent details here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AgentDetails;
