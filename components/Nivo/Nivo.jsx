import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import { ResponsiveLine } from "@nivo/line";

function Nivo() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/db/data?id=cuid-01");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div style={{ height: "400px", padding: "20px" }}>
        <ResponsiveLine
          data={[
            {
              id: "temperature",
              data: data.map((entry) => ({
                x: entry.timestamp,
                y: entry.current_temperature,
              })),
            },
            {
              id: "pump",
              data: data.map((entry) => ({
                x: entry.timestamp,
                y: entry.pump_state ? 1 : 0,
              })),
            },
            {
              id: "resistance",
              data: data.map((entry) => ({
                x: entry.timestamp,
                y: entry.resistance_state ? 1 : 0,
              })),
            },
          ]}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            precision: "minute",
          }}
          xFormat="time:%Y-%m-%d, %H:%M"
          axisBottom={{
            format: "%b %d, %H:%M",
            tickValues: "every 6 hours",
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={[
            {
              id: "temperature",
              value: "current_temperature",
              scale: "linear",
              position: "left",
              legend: "Temperature",
            },
            {
              id: "state",
              value: "pump_state",
              scale: "linear",
              position: "right",
              legend: "Pump State",
            },
            {
              id: "state",
              value: "resistance_state",
              scale: "linear",
              position: "right",
              legend: "Resistance State",
            },
          ]}
          enableGridX={false}
          enablePoints={false}
          colors={{ scheme: "set1" }}
          useMesh={true}
        />
      </div>
    </Paper>
  );
}

export default Nivo;
