import Axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/";

class WeatherCalss {
  callGet(url, callback) {
    Axios.get(url)
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getWeather(city, callback) {
    this.callGet(
      baseUrl +
        "weather?q=" +
        city +
        "&units=metric" +
        "&appid="+
        process.env.REACT_APP_API_KEY,
      callback
    );
  }

  getCities(searchTerm, callback){
    this.callGet(
      baseUrl +
        "find?q=" +
        searchTerm +
        "&units=metric" +
        "&appid="+
        process.env.REACT_APP_API_KEY,
      callback
    );
  }
}

export default new WeatherCalss();
