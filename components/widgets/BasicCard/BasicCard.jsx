import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard({ title, value, unit, icon }) {
  return (
    <Card sx={{ minWidth: 275, paddingBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h2" sx={{ textAlign: "center" }} component="div">
          ON
        </Typography>
      </CardContent>
    </Card>
  );
}
