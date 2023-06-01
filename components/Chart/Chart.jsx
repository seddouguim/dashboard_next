import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";

import "chartjs-adapter-date-fns";
import { format } from "date-fns";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  TimeScale,

  PointElement,
  ChartTooltip,
  Legend,
  LinearScale,
  LineElement,
  CategoryScale
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
    };

    const pumpData = {
      label: "Pump kWh",
      data: [],
      yAxisID: "energy",
      stepped: "true",
    };

    const resistanceData = {
      label: "Resistance kWh",
      data: [],
      yAxisID: "energy",
      stepped: "true",
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

    data.forEach((item) => {
      temperatureData.data.push(item.current_temperature);
      pumpData.data.push(item.pump_kwh);
      resistanceState.data.push(item.resistance_state ? "ON" : "OFF");
      pumpState.data.push(item.pump_state ? "ON" : "OFF");
      resistanceData.data.push(item.resistance_kwh);
      timestamps.push(item.timestamp);
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
        text: "Chart Title",
      },
    },
    scales: {
      // x: {
      //   type: "time",
      //   time: {
      //     unit: "hour",
      //     displayFormats: {
      //       hour: "HH:mm",
      //     },
      //   },
      //   grid: {
      //     drawOnChartArea: false, // only want the grid lines for one axis to show up
      //   },
      //   display: true,
      //   title: {
      //     display: true,
      //     text: "Date",
      //   },
      //   ticks: {
      //     maxTicksLimit: 20,
      //     source: "data",
      //     autoSkip: true,
      //   },
      //   adapters: {
      //     date: {
      //       parser: (timestamp) => utcToZonedTime(timestamp, "YOUR_TIMEZONE"),
      //       format: (timestamp) => {
      //         if (timestamp.getMinutes() === 0) {
      //           return format(timestamp, "yyyy");
      //         } else {
      //           return format(timestamp, "HHH:mm");
      //         }
      //       },
      //     },
      //   },
      // },
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
          drawOnChartArea: false, // only want the grid lines for one axis to show up
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
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  const chartData = createChartData(data);

  // Define the modern color palette
  const colors = [
    "#3e82f7", // blue
    "#34c38f", // green
    "#ff6961", // red
  ];

  // Assign the colors to the datasets
  chartData.datasets.forEach((dataset, index) => {
    dataset.borderColor = colors[index];
    dataset.backgroundColor = `${colors[index]}22`; // Add some transparency to the background color
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
        <Tooltip title="Reload">
          <IconButton aria-label="reload" onClick={fetchData}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <div style={{ padding: "20px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Paper>
  );
};

export default Chart;
