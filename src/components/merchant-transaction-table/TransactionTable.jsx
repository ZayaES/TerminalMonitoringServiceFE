import './TransactionTable.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const TransactionTable = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 , headerClassName:"header-custom"},
    {
      field: 'transactionRef',
      headerName: 'Transaction Ref',
      width: 220,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 100,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'transactionDate',
      headerName: 'Transaction Date',
      // type: 'number',
      width: 110,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'terminalId',
      headerName: 'Terminal Id',
      width: 110,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 90,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'transactionType',
      headerName: 'Transaction Type',
      width: 110,
      editable: true,
      headerClassName:"header-custom"
    },
    {
      field: 'agentName',
      headerName: 'Agent Name',
      width: 150,
      editable: true,
      headerClassName:"header-custom"
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 110,
    //   editable: true,
    // },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <div className={params.value === 'Declined' ? 'status-declined' : params.value === 'Approved' ? 'status-approved' : ''}>
          {params.value}
        </div>
      ),
      headerClassName:"header-custom"
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, transactionRef: '2076AWB300380620240215154336', amount: 30109, transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 2, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 3, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 4, transactionRef: '2076AWB300380620240215154336', amount: 30109, transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Declined'},
    { id: 5, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Declined'},
    { id: 6, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 7, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Declined'},
    { id: 8, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 9, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 10, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 11, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    { id: 12, transactionRef: '2076AWB300380620240215154336', amount: 30109,  transactionDate: '15/02/2024 15:43', terminalId: '2076AWB3', region: 'West' , transactionType: 'Local Funds Deposit', agentName: 'UBTH REMITA POS COLLECTCO FORESTRY REDNG', status: 'Approved'},
    
  ];
  
  return ( 
    <div className="transaction-table">
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
   );
}
 
export default TransactionTable;