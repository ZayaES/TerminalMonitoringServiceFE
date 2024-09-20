import './MerchantDetails.css';
import Navbar from '../../components/navbar/Navbar';
import TransactionTable from '../../components/transaction-table/TransactionTable';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaRegEye, FaTimes } from "react-icons/fa";




const MerchantDetails = () => {

  const [rows, setRows] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetch('https://zaya.pythonanywhere.com/api/v1/merchants')
      .then(response => response.json())
      .then(data => {
        const transformedData = data.map((item, index) => ({
          id: index + 1, 
          agentName: `${item['Merchant_Name']}`,
          merchantId: item['Merchant_ID'],
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
    { field: 'agentName', headerName: 'Merchant Name', width: 150 },
    { field: 'merchantId', headerName: 'Merchant ID', type: 'number', width: 150 },
    { field: 'terminalId', headerName: 'Terminal ID', width: 160 },
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
    <div className="merchant-details">
      <Navbar header='Merchant Details' />

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
              <h2>Merchant Information</h2>
              <div style={{padding: '10px 20px'}} className={selectedAgent['Status'] === false ? 'status-declined' : selectedAgent['Status'] === true ? 'status-approved' : ''}>
                {selectedAgent['Status'] === true ? 'Active' : 'Inactive'} 
              </div>
              <FaTimes className="popup-close-icon" onClick={handleClosePopup} />
            </div>
            <div className="popup-body">
              <div>
                <p><strong>Merchant Name:</strong> {selectedAgent['Merchant_Name']}</p>
                <p><strong>Merchant ID:</strong> {selectedAgent['Merchant_ID']}</p>
                <p><strong>Terminal ID:</strong> {selectedAgent['Terminal ID']}</p>
                <p><strong>Date Created:</strong> {selectedAgent['Date Created']}</p>
                <p><strong>Date Activated:</strong> {selectedAgent['Date Activated']}</p>
                <p><strong>Merchant Contact Number:</strong> {selectedAgent['Contact Number']}</p>
                <p><strong>Email:</strong> {selectedAgent['Email']}</p>
              </div>

              <div>
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
}
 
export default MerchantDetails;