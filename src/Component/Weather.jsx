import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CityDropdown from "./CityDropdown";

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
  city: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function Weather() {
  const classes = useStyles();
  const [inputCity, setInputCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const [cities, setCities] = useState([
    {
      id: 119730,
      name: "del",
      coord: {
        lat: 38.7941,
        lon: 45.0665,
      },
      main: {
        temp: 289.15,
        feels_like: 285.85,
        temp_min: 289.15,
        temp_max: 289.15,
        pressure: 1023,
        humidity: 48,
      },
      dt: 1602068945,
      wind: {
        speed: 3.1,
        deg: 110,
      },
      sys: {
        country: "IR",
      },
      rain: null,
      snow: null,
      clouds: {
        all: 75,
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
    },
    {
      id: 2660522,
      name: "Del",
      coord: {
        lat: 46.6391,
        lon: 9.5672,
      },
      main: {
        temp: 278.15,
        feels_like: 273.44,
        temp_min: 278.15,
        temp_max: 278.15,
        pressure: 1016,
        humidity: 75,
      },
      dt: 1602069040,
      wind: {
        speed: 4.1,
        deg: 30,
      },
      sys: {
        country: "CH",
      },
      rain: null,
      snow: null,
      clouds: {
        all: 75,
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d",
        },
      ],
    },
    {
      id: 6357301,
      name: "Del",
      coord: {
        lat: 43.1167,
        lon: -8.4662,
      },
      main: {
        temp: 292.2,
        feels_like: 292.74,
        temp_min: 291.48,
        temp_max: 293.15,
        pressure: 1026,
        humidity: 77,
      },
      dt: 1602069130,
      wind: {
        speed: 1.5,
        deg: 320,
      },
      sys: {
        country: "ES",
      },
      rain: null,
      snow: null,
      clouds: {
        all: 40,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
    {
      id: 3182996,
      name: "Del",
      coord: {
        lat: 45.7692,
        lon: 7.5567,
      },
      main: {
        temp: 277.61,
        feels_like: 269.92,
        temp_min: 262.15,
        temp_max: 290.15,
        pressure: 1016,
        humidity: 36,
      },
      dt: 1602069234,
      wind: {
        speed: 6.7,
        deg: 230,
      },
      sys: {
        country: "IT",
      },
      rain: null,
      snow: null,
      clouds: {
        all: 30,
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
    },
  ]);

  const handleCityChange = (cityName) => {
	setSelectedCity(cityName);
	setInputCity("");
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  return (
    <Grid container className="container">
      <Grid item md={8} className="search">
        <Autocomplete
          style={{
            width: 500,
          }}
          freeSolo
          size="small"
          options={cities}
          classes={{
            option: classes.city,
          }}
          fullWidth
          autoHighlight
          getOptionLabel={(city) => city.name}
          renderOption={(city) => (
            <CityDropdown handleCityChange={handleCityChange} city={city} />
          )}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              label="Choose a city"
              variant="outlined"
              fullWidth
              value={inputCity}
              name="inputCity"
              onChange={handleInputChange}
            />
          )}
        />
        <Button size="small" variant="contained" color="primary">
          Search
        </Button>
      </Grid>
      {selectedCity ? (
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
      ) : null}
    </Grid>
  );
}
