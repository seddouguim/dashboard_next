import { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";

import { Box, Stack } from "@mui/material";

import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import { format } from "date-fns";

import axios from "axios";

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
  Title,
} from "chart.js";

ChartJS.register(
  Title,
  TimeScale,
  PointElement,
  ChartTooltip,
  Legend,
  LinearScale,
  LineElement,
  CategoryScale,
  Filler
);

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Chart = () => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const fetchData = async () => {
    if (!timeframe.startDate || !timeframe.endDate) {
      return;
    }

    const startDateString = timeframe.startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    const endDateString = timeframe.endDate
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    console.log(
      "Fetching data with these dates: ",
      startDateString,
      endDateString
    );

    try {
      const response = await axios.get("/api/db/data", {
        params: {
          id: "cuid-01",
          startDate: startDateString,
          endDate: endDateString,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async () => {
    try {
      await fetch("/api/db/delete?id=cuid-01");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setData([]);
  };

  useEffect(() => {
    fetchData();
  }, [timeframe]);

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

    data?.forEach((item) => {
      const formattedTimestamp = format(
        new Date(item.timestamp),
        "dd/MM/yy 'at' HH:mm:ss"
      );

      temperatureData.data.push({
        x: formattedTimestamp,
        y: item.current_temperature,
        current_cycle: item.current_cycle,
        current_term: item.current_term,
      });

      resistanceState.data.push({
        x: formattedTimestamp,
        y: item.resistance_state ? "ON" : "OFF",
        current_cycle: item.current_cycle,
        current_term: item.current_term,
      });

      pumpState.data.push({
        x: formattedTimestamp,
        y: item.pump_state ? "ON" : "OFF",
      });
    });

    const chartData = {
      datasets: [temperatureData, pumpState, resistanceState],
    };

    return chartData;
  };

  const chartData = createChartData(data);

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
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.yAxisID === "temperature") {
              const dataPoint = context.dataset.data[context.dataIndex];
              const term = dataPoint.current_term || "N/A";
              return [
                `${context.dataset.label}: ${context.parsed.y}`,
                `Cycle: ${dataPoint.current_cycle}`,
                `Term: ${term}`,
              ];
            }
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
      temperature: {
        type: "linear",
        display: true,
        position: "left",
        stack: "1st",
        title: {
          display: true,
          text: "Temperature (°C)",
          font: {
            weight: "bold",
          },
        },
        stackWeight: 4,
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
          font: {
            weight: "bold",
          },
        },
        stackWeight: 2,
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
          font: {
            weight: "bold",
          },
        },
        stackWeight: 2,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const colors = ["#3e82f7", "#34c38f", "#ff6961"];

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
          fontWeight="bold"
          textTransform="uppercase"
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row">
          <DatePicker
            format="DD/MM/YYYY"
            value={timeframe.startDate}
            label="From"
            onChange={(newValue) =>
              setTimeframe({ ...timeframe, startDate: newValue })
            }
          />
          <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Typography variant="h6" fontWeight="normal">
              -
            </Typography>
          </Box>
          <DatePicker
            label="To"
            format="DD/MM/YYYY"
            value={timeframe.endDate}
            onChange={(newValue) =>
              setTimeframe({ ...timeframe, endDate: newValue })
            }
          />
        </Stack>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Paper>
  );
};

export default Chart;
