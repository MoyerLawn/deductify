import React, { useState, useEffect } from "react";
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

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const pinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NmJjODdmNy0xMzcwLTQ4MjctYTI4OS1mZmRjZjkyMGU5ZmMiLCJlbWFpbCI6Imx1aWFtaTE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ODc1MjkwYWQ1ODg2OTBiZDAzYyIsInNjb3BlZEtleVNlY3JldCI6ImIzN2RjNTVmMWY2ZjY2MmFjMTllN2EwNGQ0ZGE5ZGJkNTY1M2I2ODNjYjFkNWEyM2U5NTUxMmI2NzllYmI3OTMiLCJleHAiOjE3NTkxMjgyMTJ9.cgm3sNsMefq62h1bcbi0TzGf0of6agqalNcXMWE0bsM";

  useEffect(() => {
    const fetchFiles = async () => {
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${pinataJwt}` },
      };

      try {
        const response = await fetch("https://api.pinata.cloud/v3/files", options);
        const result = await response.json();

        if (result.data && result.data.files) {
          setData(result.data.files);
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchFiles();
  }, [pinataJwt]);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = data.map((item) => item.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit:", id);
  };

  // DELETE request to Pinata
  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${pinataJwt}` },
    };

    try {
      const response = await fetch(`https://api.pinata.cloud/v3/files/${id}`, options);
      const result = await response.json();
      console.log("Delete response:", result);

      if (response.ok) {
        // If successful, remove the deleted item from the data array
        setData((prevData) => prevData.filter((item) => item.id !== id));
        setSelectedItems((prevItems) => prevItems.filter((item) => item !== id));
      } else {
        console.error("Failed to delete file:", result);
      }
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const sortedData = data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                  sx={{ color: "green" }}
                >
                  File Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "size"}
                  direction={orderBy === "size" ? order : "asc"}
                  onClick={() => handleRequestSort("size")}
                  sx={{ color: "green" }}
                >
                  Size
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "mime_type"}
                  direction={orderBy === "mime_type" ? order : "asc"}
                  onClick={() => handleRequestSort("mime_type")}
                  sx={{ color: "green" }}
                >
                  MIME Type
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>
                <TableSortLabel
                  active={orderBy === "created_at"}
                  direction={orderBy === "created_at" ? order : "asc"}
                  onClick={() => handleRequestSort("created_at")}
                  sx={{ color: "green" }}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ borderColor: "green" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ borderColor: "green" }}>
                    <Checkbox
                      color="success"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ borderColor: "green" }}>{row.name}</TableCell>
                  <TableCell sx={{ borderColor: "green" }}>{row.size}</TableCell>
                  <TableCell sx={{ borderColor: "green" }}>{row.mime_type}</TableCell>
                  <TableCell sx={{ borderColor: "green" }}>
                    {formatDate(row.created_at)}
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
                        onClick={() => handleEdit(row.id)}
                        size="small"
                        disabled={!selectedItems.includes(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleDelete(row.id)}
                        size="small"
                        disabled={!selectedItems.includes(row.id)}
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
