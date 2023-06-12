import BasicCard from "../widgets/BasicCard/BasicCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/system";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

import Box from "@mui/material/Box";

const StatusBar = () => {
  const [data, setData] = useState({});
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const response = await axios.get("api/shadow");
      console.log(response.data.state.reported);
      setData(response.data.state.reported);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const resistance_value = data.resistance_state ? "ON" : "OFF";
  const pump_value = data.pump_state ? "ON" : "OFF";

  const energy_value = data.resistance_kwh + data.pump_kwh;

  if (!data.current_temperature) {
    return (
      <Stack direction="column" spacing={2}>
        <Skeleton variant="rectangular">
          <BasicCard title="loading..." value="Loading..." />
        </Skeleton>

        <Skeleton variant="rectangular">
          <BasicCard title="loading..." value="Loading..." />
        </Skeleton>

        <Skeleton variant="rectangular">
          <BasicCard title="loading..." value="Loading..." />
        </Skeleton>

        <Skeleton variant="rectangular">
          <BasicCard title="loading..." value="Loading..." />
        </Skeleton>
      </Stack>
    );
  }

  return (
    <Box sx={{ maxHeight: "100%", overflow: "auto" }}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Current Cycle
            </Typography>

            <Typography
              variant="h4"
              sx={{ textAlign: "center" }}
              component="div"
              color={
                data.current_cycle === "TERMINATED"
                  ? "#43a047"
                  : data.current_cycle === "HEATING UP"
                  ? "red"
                  : "lightblue"
              }
            >
              {data.current_cycle}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Current Term
            </Typography>

            <Typography
              variant="h4"
              sx={{ textAlign: "center" }}
              component="div"
              color={data.current_term === "N/A" ? "gray" : "pink"}
            >
              {data.current_term ? data.current_term : "N/A"}
            </Typography>
          </CardContent>
        </Card>
        <BasicCard
          title="Temperature"
          value={data.current_temperature.toFixed(2)}
          unit="C"
        />
        <BasicCard title="Resistance" value={resistance_value} />
        <BasicCard title="Pump" value={pump_value} />
        <BasicCard title="Energy" value={energy_value.toFixed(2)} />
      </Stack>
    </Box>
  );
};

export default StatusBar;
