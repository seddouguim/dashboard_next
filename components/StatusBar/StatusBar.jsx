import BasicCard from "../widgets/BasicCard/BasicCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/system";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

import Box from "@mui/material/Box";
import CycleInformation from "../widgets/CycleInformation";

const StatusBar = () => {
  const [data, setData] = useState({});
  const [energyData, setEnergyData] = useState({});
  const [loading, setLoading] = useState(true);
  const timerRef = useRef();

  function formatDuration(duration) {
    // Convert milliseconds to seconds
    const totalSeconds = Math.ceil(duration / 1000);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format hours, minutes, and seconds with leading zeros
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Create the formatted string
    const formattedDuration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDuration;
  }

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      try {
        let [shadowResponse, energyResponse] = await Promise.all([
          axios.get("api/shadow"),
          axios.get("api/db/power"),
        ]);
        console.log(shadowResponse.data.state.reported);
        console.log(energyResponse.data);

        setData(shadowResponse.data.state.reported);
        setEnergyData(energyResponse.data);
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const resistance_value = data.resistance_state ? "ON" : "OFF";
  const pump_value = data.pump_state ? "ON" : "OFF";

  console.log("Test" + JSON.stringify(energyData));

  const energy_value =
    energyData?.data?.daily?.pump_kwh +
      energyData?.data?.daily?.resistance_kwh || 0;

  const cycle_information = {
    current_cycle: data.current_cycle,
    current_term: data.current_term,
    current_cycle_duration: data.current_cycle_duration,
    current_term_duration: data.current_term_duration,
  };

  if (loading) {
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
            <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
              <Typography
                variant="h6"
                fontSize={14}
                component="div"
                sx={{ color: "lightgray" }}
              >
                Time remaining:
              </Typography>
              <Typography
                variant="h6"
                fontSize={14}
                component="div"
                color="lightgray"
                fontWeight="bold"
              >
                {formatDuration(data.current_cycle_duration)}
              </Typography>
            </Stack>
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

            <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
              <Typography
                variant="h6"
                fontSize={14}
                component="div"
                color="lightgray"
              >
                Time remaining:
              </Typography>
              <Typography
                variant="h6"
                fontSize={14}
                component="div"
                color="lightgray"
                fontWeight="bold"
              >
                {formatDuration(data.current_term_duration)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <BasicCard
          title="Temperature"
          value={data.current_temperature?.toFixed(2)}
        />
        <BasicCard title="Resistance" value={resistance_value} />
        <BasicCard title="Pump" value={pump_value} />
        <BasicCard title="Energy" value={energy_value.toFixed(2)} />
      </Stack>
    </Box>
  );
};

export default StatusBar;

// <Card sx={{ minWidth: 275 }}>
// <CardContent>
//   <Typography
//     sx={{ fontSize: 14 }}
//     color="text.secondary"
//     gutterBottom
//   >
//     Current Cycle
//   </Typography>

//   <Typography
//     variant="h4"
//     sx={{ textAlign: "center" }}
//     component="div"
//     color={
//       data.current_cycle === "TERMINATED"
//         ? "#43a047"
//         : data.current_cycle === "HEATING UP"
//         ? "red"
//         : "lightblue"
//     }
//   >
//     {data.current_cycle}
//   </Typography>
//   <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
//     <Typography
//       variant="h6"
//       fontSize={14}
//       component="div"
//       sx={{ color: "lightgray" }}
//     >
//       Time remaining:
//     </Typography>
//     <Typography
//       variant="h6"
//       fontSize={14}
//       component="div"
//       color="lightgray"
//       fontWeight="bold"
//     >
//       {formatDuration(data.current_cycle_duration)}
//     </Typography>
//   </Stack>
// </CardContent>
// </Card>

// <Card sx={{ minWidth: 275 }}>
// <CardContent>
//   <Typography
//     sx={{ fontSize: 14 }}
//     color="text.secondary"
//     gutterBottom
//   >
//     Current Term
//   </Typography>

//   <Typography
//     variant="h4"
//     sx={{ textAlign: "center" }}
//     component="div"
//     color={data.current_term === "N/A" ? "gray" : "pink"}
//   >
//     {data.current_term ? data.current_term : "N/A"}
//   </Typography>

//   <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
//     <Typography
//       variant="h6"
//       fontSize={14}
//       component="div"
//       color="lightgray"
//     >
//       Time remaining:
//     </Typography>
//     <Typography
//       variant="h6"
//       fontSize={14}
//       component="div"
//       color="lightgray"
//       fontWeight="bold"
//     >
//       {formatDuration(data.current_term_duration)}
//     </Typography>
//   </Stack>
// </CardContent>
// </Card>
