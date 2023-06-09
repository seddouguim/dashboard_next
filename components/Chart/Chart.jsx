import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import { format, set } from "date-fns";

import "chartjs-adapter-date-fns";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  TimeScale,
  PointElement,
  ChartTooltip,
  Legend,
  LinearScale,
  LineElement,
  CategoryScale,
  Filler
);

const Chart = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/db/data?id=cuid-01");
      // const response = await fetch("/api/db/data?id=claay207y00083b6qint7umkc");

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch("/api/db/delete?id=cuid-01");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setData([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined;

  const createChartData = (data) => {
    const temperatureData = {
      label: "Temperature",
      data: [],
      yAxisID: "temperature",
      fill: true,
    };

    const resistanceState = {
      label: "Resistance state",
      data: [],
      yAxisID: "resistance",
      stepped: true,
    };

    const pumpState = {
      label: "Pump state",
      data: [],
      yAxisID: "pump",
      stepped: true,
    };

    const timestamps = [];

    data?.forEach((item) => {
      temperatureData.data.push(item.current_temperature);
      resistanceState.data.push(item.resistance_state ? "ON" : "OFF");
      pumpState.data.push(item.pump_state ? "ON" : "OFF");

      const formattedTimestamp = format(
        new Date(item.timestamp),
        "yyyy-MM-dd HH:mm:ss"
      );

      timestamps.push(formattedTimestamp);
    });

    const chartData = {
      labels: timestamps,
      datasets: [temperatureData, pumpState, resistanceState],
    };

    return chartData;
  };

  const chartOptions = {
    responsive: true,
    autoPadding: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: true,
    plugins: {
      title: {
        display: true,
        text: "Cycles Information",
      },
    },
    scales: {
      temperature: {
        type: "linear",
        display: true,
        position: "left",
        stack: "1st",
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        stackWeight: 2,
        grid: {
          drawOnChartArea: true,
        },
        min: 0,
      },
      resistance: {
        type: "category",
        labels: ["ON", "OFF"],
        offset: true,
        position: "left",
        stack: "1st",
        title: {
          display: true,
          text: "Resistance",
        },
        stackWeight: 1,
        grid: {
          drawOnChartArea: false,
        },
      },
      pump: {
        type: "category",
        labels: ["ON", "OFF"],
        offset: true,
        position: "left",
        stack: "1st",
        title: {
          display: true,
          text: "Pump",
        },
        stackWeight: 1,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartData = createChartData(data);

  const colors = [
    "#3e82f7", // blue
    "#34c38f", // green
    "#ff6961", // red
  ];

  chartData.datasets.forEach((dataset, index) => {
    dataset.borderColor = colors[index];
    dataset.backgroundColor = `${colors[index]}22`;
  });

  return (
    <Paper>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h1"
          fontSize="0.8rem"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Charts
        </Typography>
        <div>
          <Tooltip title="Reload">
            <IconButton aria-label="reload" onClick={fetchData}>
              <CachedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteData}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      <div style={{ padding: "20px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Paper>
  );
};

export default Chart;
