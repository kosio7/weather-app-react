import React, { useEffect, useState } from "react";
import "./App.css";
import SortableTable from "./components/SortableTable";
import { getParsedTextData } from "./utils";

function App() {
  function handleOptionChange(e) {
    setSelectedTempType(e.target.value);
  }

  const [weatherData, setWeatherData] = useState({});
  const [selectedTempType, setSelectedTempType] = useState("fah");

  // useEffect(() => {
  //   fetch("/weather.json")
  //     .then(r => r.text())
  //     .then(data => {
  //       setWeatherData(getParsedJsonData(JSON.parse(data)));
  //     });
  // }, []);

  useEffect(() => {
      fetch("/weather_data.txt")
        .then(r => r.text())
        .then(data => {
          setWeatherData(getParsedTextData(data))
        })
  }, []);

  return (
    <React.Fragment>
      <label htmlFor="select-fahrenheit">
        <input
          id="select-fahrenheit"
          type="radio"
          value="fah"
          name="temp"
          defaultChecked
          onChange={handleOptionChange}
        />
        Fahrenheit
      </label>
      <label htmlFor="select-celsius">
        <input
          id="select-celsius"
          type="radio"
          value="cel"
          name="temp"
          onChange={handleOptionChange}
        />
        Celsius
      </label>
      {weatherData &&
      weatherData.parsedDataFahreinheit &&
      weatherData.parsedDataCelsius ? (
        <SortableTable
          data={
            selectedTempType === "fah"
              ? weatherData.parsedDataFahreinheit
              : weatherData.parsedDataCelsius
          }
        />
      ) : (
        "No data."
      )}
    </React.Fragment>
  );
}

export default App;
