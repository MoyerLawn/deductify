import React, { useState } from "react";
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
} from "@mui/material";

const initialData = [
  {
    category: "Electronics",
    vendor: "Vendor A",
    date: "2024-09-28",
    totalAmount: 1000,
  },
  {
    category: "Furniture",
    vendor: "Vendor B",
    date: "2024-09-27",
    totalAmount: 1500,
  },
  {
    category: "Clothing",
    vendor: "Vendor C",
    date: "2024-09-26",
    totalAmount: 2000,
  },
  {
    category: "Groceries",
    vendor: "Vendor D",
    date: "2024-09-25",
    totalAmount: 2500,
  },
  {
    category: "Toys",
    vendor: "Vendor E",
    date: "2024-09-24",
    totalAmount: 3000,
  },
  {
    category: "Sports",
    vendor: "Vendor F",
    date: "2024-09-23",
    totalAmount: 3500,
  },
  {
    category: "Books",
    vendor: "Vendor G",
    date: "2024-09-22",
    totalAmount: 4000,
  },
  {
    category: "Stationery",
    vendor: "Vendor H",
    date: "2024-09-21",
    totalAmount: 4500,
  },
];

const DataTable = () => {
  const [data, setData] = useState(initialData); // State for data
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("category");

  const handleSelect = (category) => {
    setSelectedItems((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allCategories = data.map((item) => item.category);
      setSelectedItems(allCategories);
    } else {
      setSelectedItems([]);
    }
  };

  const handleEdit = (category) => {
    console.log("Edit:", category);
  };

  const handleDelete = (category) => {
    setData((prevData) => prevData.filter((item) => item.category !== category));
    setSelectedItems((prevItems) => prevItems.filter((item) => item !== category)); // Remove the deleted item from selected items
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box sx={{ width: "60%", margin: "1rem auto" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "green",
          marginBottom: "1rem",
          textAlign: "left",
        }}
      >
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderColor: "green" }}>
                <Checkbox
                  color="success"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === data.length}
                />
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleRequestSort("category")}
                  sx={{ color: "green" }}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "vendor"}
                  direction={orderBy === "vendor" ? order : "asc"}
                  onClick={() => handleRequestSort("vendor")}
                  sx={{ color: "green" }}
                >
                  Vendor
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                  sx={{ color: "green" }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "totalAmount"}
                  direction={orderBy === "totalAmount" ? order : "asc"}
                  onClick={() => handleRequestSort("totalAmount")}
                  sx={{ color: "green" }}
                >
                  Total Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.category}>
                  <TableCell sx={{ borderColor: "green" }}>
                    <Checkbox
                      color="success"
                      checked={selectedItems.includes(row.category)}
                      onChange={() => handleSelect(row.category)}
                    />
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    {row.category}
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    {row.vendor}
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    {row.totalAmount}
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "gold",
                          color: "green",
                        }}
                        onClick={() => handleEdit(row.category)}
                        size="small"
                        disabled={!selectedItems.includes(row.category)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleDelete(row.category)} // Call delete function
                        size="small"
                        disabled={!selectedItems.includes(row.category)} // Ensure only enabled if the specific row is selected
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default DataTable;