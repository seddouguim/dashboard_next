import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

const CardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
}));

const CardHeader = styled(CardContent)(({ theme }) => ({
  backgroundColor: "#475C7A",
  //   display: "flex",
  textAlign: "center",
  alignItems: "center",
  color: theme.palette.common.white,
  padding: theme.spacing(1),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
}));

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  "& table": {
    borderCollapse: "separate",
    borderSpacing: "1",
  },
}));

const TableHeadStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#685d79",
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
}));

const CycleInformation = ({ data }) => {
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

  return (
    <>
      <CardContainer>
        <CardHeader>
          <AccessTimeIcon />
          <CardTitle variant="h2">Cycle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <TableContainerStyled>
            <Table size="small">
              <TableHeadStyled>
                <TableRow>
                  <TableCellStyled>Current Cycle</TableCellStyled>
                </TableRow>
              </TableHeadStyled>
              <TableBody>
                <TableRow>
                  <TableCell>{data.current_cycle}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerStyled>
          <TableContainerStyled>
            <Table size="small">
              <TableHeadStyled>
                <TableRow>
                  <TableCellStyled>Time Remaining</TableCellStyled>
                </TableRow>
              </TableHeadStyled>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {formatDuration(data.current_cycle_duration)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerStyled>
        </CardContent>
      </CardContainer>
      <CardContainer>
        <CardHeader>
          <EventIcon />
          <CardTitle variant="h2">Term Information</CardTitle>
        </CardHeader>
        <CardContent>
          <TableContainerStyled>
            <Table size="small">
              <TableHeadStyled>
                <TableRow>
                  <TableCellStyled>Current Term</TableCellStyled>
                </TableRow>
              </TableHeadStyled>
              <TableBody>
                <TableRow>
                  <TableCell>{data.current_term}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerStyled>
          <TableContainerStyled>
            <Table size="small">
              <TableHeadStyled>
                <TableRow>
                  <TableCellStyled>Time Remaining</TableCellStyled>
                </TableRow>
              </TableHeadStyled>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {formatDuration(data.current_term_duration)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainerStyled>
        </CardContent>
      </CardContainer>
    </>
  );
};

export default CycleInformation;
