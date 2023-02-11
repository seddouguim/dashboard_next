import BasicCard from "../widgets/BasicCard/BasicCard";

const StatusBar = () => {
  return (
    <>
      <BasicCard title="Temperature" />
      <BasicCard title="Resistance" />
      <BasicCard title="Pump" />
      <BasicCard title="Energy" />
    </>
  );
};

export default StatusBar;
