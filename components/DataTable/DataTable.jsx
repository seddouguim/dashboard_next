import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import TablePagination from "@mui/material/TablePagination";

import Typography from "@mui/material/Typography";

import CachedIcon from "@mui/icons-material/Cached";

import axios from "axios";

import { useEffect, useState } from "react";

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const result = await axios.get("/api/db/data?id=claay207y00083b6qint7umkc");
    setRows(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ marginTop: 2, maxWidth: "92%" }}>
        <TableContainer>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h1"
              fontSize="0.8rem"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Data Table
            </Typography>
            <Tooltip title="Refresh">
              <IconButton onClick={() => fetchData()}>
                <CachedIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Resistance State</TableCell>
                <TableCell>Pump State</TableCell>
                <TableCell>Resistance ON</TableCell>
                <TableCell>Pump ON</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.current_temperature}</TableCell>
                    <TableCell>{row.resistance_state ? "ON" : "OFF"}</TableCell>
                    <TableCell>{row.pump_state ? "ON" : "OFF"}</TableCell>
                    <TableCell>
                      {Math.round(row.resistance_on_time_total / 1000)}s
                    </TableCell>
                    <TableCell>
                      {Math.round(row.pump_on_time_total / 1000)}s
                    </TableCell>
                    <TableCell>
                      {new Date(row.timestamp).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10]}
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default DataTable;
