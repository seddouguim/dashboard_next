import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";

import CachedIcon from "@mui/icons-material/Cached";

import ReactEcharts from "echarts";

const Chart = () => {
  const option = {
    title: {
      text: "Sales by Product Category",
    },
    tooltip: {},
    legend: {
      data: ["Sales"],
    },
    xAxis: {
      data: [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
      ],
    },
    yAxis: {},
    series: [
      {
        name: "Sales",
        type: "bar",
        data: [200, 300, 450, 600, 800],
      },
    ],
  };

  return (
    <Paper sx={{ maxWidth: "92%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h1"
          fontSize="0.8rem"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Charts
        </Typography>
        <Tooltip title="Reload">
          <IconButton aria-label="reload">
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <div
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        {/* <ReactEcharts option={option} /> */}
      </div>
    </Paper>
  );
};

export default Chart;
