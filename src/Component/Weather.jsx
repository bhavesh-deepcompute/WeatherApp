import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
  Chip
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ReplayIcon from "@material-ui/icons/Replay";
import CityDropdown from "./CityDropdown";
import WeatherCalls from "./../Service/weather";

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
  const [prevSearches, setPrevSearches] = useState([]);

  console.log(prevSearches);

  const [cities, setCities] = useState([]);

  const handleCityChange = (cityName) => {
    WeatherCalls.getWeather(cityName, (res) => {
      if (res.data) {
        setSelectedCity(res.data);
        setInputCity("");
        setPrevSearches(filterSearch(res.data));
      } else {
        console.log(res);
      }
    });
  };

  const filterSearch = (city) => {
    let newSearches = prevSearches.filter((lastCity) => {
      if (city.name !== lastCity.name) {
        return true;
      }
      return false;
    });
    if(newSearches.length>=5){
      newSearches = newSearches.slice(1);
    }
    newSearches.push(city);
    return newSearches;
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    if (e.target.value.length > 2) {
      WeatherCalls.getCities(e.target.value, (res) => {
        if (res.data) {
          setCities(res.data.list);
        } else {
          console.log(res);
        }
      });
    }
  };

  const handleReload = () => {
    handleCityChange(selectedCity.name);
  };

  const handleAutoComplete = (e, value) => {
    if (value.name) {
      handleCityChange(value.name);
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     if (selectedCity) handleCityChange(selectedCity.name);
  //   }, 60000);
  // }, [selectedCity]);

  return (
    <Grid container className="container">
      <Grid item md={8} xs={12} className="search">
        <Autocomplete
          style={{
            width: 500,
          }}
          onChange={handleAutoComplete}
          freeSolo
          size="small"
          options={cities}
          classes={{
            option: classes.city,
          }}
          inputValue={inputCity}
          fullWidth
          autoHighlight
          getOptionLabel={(city) => (city.name ? city.name : "")}
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
        <Grid item md={8} xs={12} className="cards">
          <Card className={classes.root} variant="elevation" elevation={2}>
            <CardContent className="card-content">
              <IconButton className="reload-button" onClick={handleReload}>
                <ReplayIcon />
              </IconButton>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {new Date().toLocaleString()}
              </Typography>
              <Typography variant="h5" component="h2">
                {selectedCity.name + ", " + selectedCity.sys.country}
              </Typography>
              <Typography variant="h3" component="h2">
                {selectedCity.main.temp + "°C"}
              </Typography>
              <Typography className={classes.pos} color="textPrimary">
                Feels like {selectedCity.main.feels_like + "°C"}.{" "}
                {selectedCity.weather[0].main}.{" "}
                {selectedCity.weather[0].description}
              </Typography>
              <Grid container spacing={2} className="city-card-info">
                <Grid item md={4}>
                  {selectedCity.wind.speed + "m/s"}
                </Grid>
                <Grid item md={4}>
                  {selectedCity.main.pressure + "hPa"}
                </Grid>
                <Grid item md={4}>
                  {"Humidity:" + selectedCity.main.humidity + "%"}
                </Grid>
                <Grid item md={4}>
                  {"Visibility:" + selectedCity.visibility / 1000 + "km"}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Grid item md={8} xs={12} className="last-searches">
        {
          prevSearches.map( (city) => {
            return (
              <Chip key={city.name} className="searches-chip" label={city.name+", "+city.sys.country} onClick={ () => {
                handleCityChange(city.name)
              }} size="medium" component="a" clickable variant="outlined" />
                  )
          })
        }
      </Grid>
    </Grid>
  );
}
