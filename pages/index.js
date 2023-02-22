import Chart from "../components/Chart/Chart";
import DataTable from "../components/DataTable/DataTable";

import Divider from "@mui/material/Divider";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ maxHeight: "100%", overflow: "auto" }}>
      <Typography
        variant="h1"
        fontSize="0.9rem"
        textTransform="uppercase"
        fontWeight="bold"
        sx={{ margin: "1rem 0" }}
      >
        Dashboard
      </Typography>
      <DataTable />
      <Divider sx={{ marginY: "1rem" }} />
      <Chart />
    </Box>
  );
};

export default Dashboard;
