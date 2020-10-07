import React from "react";

export default function CityDropdown(props) {
  return (
    <div className="city-dropdown" onClick={() => props.handleCityChange(props.city.name)} >
    <div>
      <span>
        {props.city.name},{props.city.sys.country}
      </span>
    </div>
      <div>{props.city.main.temp}</div>
      <div>{props.city.weather[0].main}</div>
    </div>
  );
}
