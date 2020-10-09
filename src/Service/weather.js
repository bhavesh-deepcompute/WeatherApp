import Axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/";

class WeatherCalss {
  callGet(url, callback) {
    Axios.get(url)
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        callback(err);
      });
  }

  getWeather(city, callback) {
    this.callGet(
      baseUrl +
        "weather?q=" +
        city.name +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_API_KEY,
      callback
    );
  }

  getForecastData(city, callback) {
    this.callGet(
      baseUrl +
        "onecall?lat=" +
        city.coord.lat +
        "&lon=" +
        city.coord.lon +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_API_KEY,
        callback
    );
  }

  getHistoricalData(city, dt, callback) {
    this.callGet(
      baseUrl +
        "/onecall/timemachine?lat=" +
        city.coord.lat +
        "&lon=" +
        city.coord.lon +
        "&units=metric" +
        "&dt=" +
        + dt +
        "&appid=" +
        process.env.REACT_APP_API_KEY,
        callback
    );
  }

  getCities(searchTerm, callback) {
    this.callGet(
      baseUrl +
        "find?q=" +
        searchTerm +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_API_KEY,
      callback
    );
  }
}

export default new WeatherCalss();
