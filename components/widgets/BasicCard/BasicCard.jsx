import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard({ title, value, unit, icon }) {
  let color = "text.primary";

  if (value === "ON") {
    color = "success.main";
  }

  if (value === "OFF") {
    color = "error.main";
  }

  if (title === "Energy") {
    color = "info.main";
  }

  return (
    <Card sx={{ minWidth: 275, paddingBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="h2"
          sx={{ textAlign: "center" }}
          component="div"
          color={color}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
