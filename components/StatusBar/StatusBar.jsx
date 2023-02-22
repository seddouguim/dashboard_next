import BasicCard from "../widgets/BasicCard/BasicCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/system";

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
    console.log("loading...");
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
    <Stack direction="column" spacing={2} alignItems="center">
      <BasicCard
        title="Temperature"
        value={data.current_temperature}
        unit="C"
      />
      <BasicCard title="Resistance" value={resistance_value} />
      <BasicCard title="Pump" value={pump_value} />
      <BasicCard title="Energy" value={Math.round(energy_value / 10) * 10} />
    </Stack>
  );
};

export default StatusBar;
