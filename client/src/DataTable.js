import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Checkbox,
  TablePagination,
  TableSortLabel,
} from '@mui/material';

const sampleData = [
  { name: 'John Doe', category: 'Electronics', vendor: 'Vendor A', date: '2024-09-28', totalAmount: 1000, writeoffAmount: 100 },
  { name: 'Jane Smith', category: 'Furniture', vendor: 'Vendor B', date: '2024-09-27', totalAmount: 1500, writeoffAmount: 150 },
  { name: 'Alice Johnson', category: 'Clothing', vendor: 'Vendor C', date: '2024-09-26', totalAmount: 2000, writeoffAmount: 200 },
  { name: 'Bob Brown', category: 'Groceries', vendor: 'Vendor D', date: '2024-09-25', totalAmount: 2500, writeoffAmount: 250 },
  { name: 'Charlie Davis', category: 'Toys', vendor: 'Vendor E', date: '2024-09-24', totalAmount: 3000, writeoffAmount: 300 },
  { name: 'David Evans', category: 'Sports', vendor: 'Vendor F', date: '2024-09-23', totalAmount: 3500, writeoffAmount: 350 },
  { name: 'Eva Foster', category: 'Books', vendor: 'Vendor G', date: '2024-09-22', totalAmount: 4000, writeoffAmount: 400 },
  { name: 'Frank Green', category: 'Stationery', vendor: 'Vendor H', date: '2024-09-21', totalAmount: 4500, writeoffAmount: 450 },
];

const DataTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleSelect = (name) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allNames = sampleData.map((item) => item.name);
      setSelectedItems(allNames);
    } else {
      setSelectedItems([]);
    }
  };

  const handleEdit = (name) => {
    console.log('Edit:', name);
  };

  const handleDelete = (name) => {
    console.log('Delete:', name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box sx={{ width: '80%', margin: '1rem auto' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'green', marginBottom: '1rem', textAlign: 'left' }}>
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderColor: 'green' }}>
                <Checkbox color="success" onChange={handleSelectAll} checked={selectedItems.length === sampleData.length} />
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                  sx={{ color: 'green' }}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleRequestSort('category')}
                  sx={{ color: 'green' }}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'vendor'}
                  direction={orderBy === 'vendor' ? order : 'asc'}
                  onClick={() => handleRequestSort('vendor')}
                  sx={{ color: 'green' }}
                >
                  Vendor
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleRequestSort('date')}
                  sx={{ color: 'green' }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'totalAmount'}
                  direction={orderBy === 'totalAmount' ? order : 'asc'}
                  onClick={() => handleRequestSort('totalAmount')}
                  sx={{ color: 'green' }}
                >
                  Total Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>
                <TableSortLabel
                  active={orderBy === 'writeoffAmount'}
                  direction={orderBy === 'writeoffAmount' ? order : 'asc'}
                  onClick={() => handleRequestSort('writeoffAmount')}
                  sx={{ color: 'green' }}
                >
                  Writeoff Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: 'green' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ borderColor: 'green' }}>
                  <Checkbox 
                    color="success"
                    checked={selectedItems.includes(row.name)}
                    onChange={() => handleSelect(row.name)}
                  />
                </TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.name}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.category}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.vendor}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.date}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.totalAmount}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>{row.writeoffAmount}</TableCell>
                <TableCell sx={{ borderColor: 'green' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: 'gold', marginRight: 1, color: 'green' }}
                      onClick={() => handleEdit(row.name)}
                      size="small"
                      disabled={!selectedItems.includes(row.name)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDelete(row.name)}
                      size="small"
                      disabled={!selectedItems.includes(row.name)} // Ensure only enabled if the specific row is selected
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={sampleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default DataTable;