import React, { useEffect, useState } from "react";
import "./App.css";
import SortableTable from "./components/SortableTable";

function App() {
  function convertFahToCel(fahDegree) {
    let celsiusTemp = Math.round((5 / 9) * (fahDegree - 32));

    return celsiusTemp;
  }

  function handleOptionChange(e) {
    setSelectedTempType(e.target.value);
  }

  const [weatherData, setWeatherData] = useState({});
  const [selectedTempType, setSelectedTempType] = useState("fah");

  useEffect(() => {
    function getParsedData(rawJSON) {
      const parsedDataFahreinheit = [];
      const parsedDataCelsius = [];

      Object.keys(rawJSON).forEach((key, idx) => {
        if (rawJSON[key] !== "") {
          const rowFahrenheit = rawJSON[key].split(" ");

          if (
            isNaN(rowFahrenheit[0]) &&
            isNaN(rowFahrenheit[1]) &&
            isNaN(rowFahrenheit[2])
          ) {
            parsedDataCelsius.push({ key: idx, value: rowFahrenheit });
          } else {
            const minTempInCelsius = convertFahToCel(rowFahrenheit[2]);
            const maxTempInCelsius = convertFahToCel(rowFahrenheit[1]);
            const rowCelsius = [
              rowFahrenheit[0],
              maxTempInCelsius,
              minTempInCelsius
            ];
            parsedDataCelsius.push({ key: idx, value: rowCelsius });
          }

          parsedDataFahreinheit.push({ key: idx, value: rowFahrenheit });
        }
      });

      return { parsedDataFahreinheit, parsedDataCelsius };
    }

    fetch("/weather.json")
      .then(r => r.text())
      .then(data => {
        setWeatherData(getParsedData(JSON.parse(data)));
      });
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
