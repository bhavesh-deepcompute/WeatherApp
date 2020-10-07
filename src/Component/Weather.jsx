import React from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
	maxWidth: 375,
	
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Weather() {
  const classes = useStyles();

  return (
    <Grid container className="container">
      <Grid item md={8} className="search">
        <TextField
          label="Search City"
          fullWidth
          size="small"
          variant="outlined"
        />
        <Button size="small" variant="contained" color="primary">
          Search
        </Button>
      </Grid>
      <Grid item md={8} className="cards">
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              4:02pm,Oct 7
            </Typography>
            <Typography variant="h5" component="h2">
              Bengaluru, IN
            </Typography>
            <Typography variant="h3" component="h2">
              29°C
            </Typography>
            <Typography className={classes.pos} color="textPrimary">
              Feels like 31°C. Scattered clouds. Light breeze
            </Typography>
            <Typography variant="body2" component="p">
              2.1m/s NNW 1010hPa Humidity:55% UV:13 Dew point:19°C
              Visibility:6.0km
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
