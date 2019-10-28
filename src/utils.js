function convertFahToCel(fahDegree) {
    let celsiusTemp = Math.round((5 / 9) * (fahDegree - 32));

    return celsiusTemp;
}

export function getParsedJsonData(rawJSON) {
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

export function getParsedTextData(rawText) {
    let data = rawText.split("\n");

    data = data.map(el => {
      return el.split(" ").filter(element => element);    
    });

    const parsedDataFahreinheit = [];
    const parsedDataCelsius = [];

    data.forEach((row, idx) => {
      if (row.length >= 3) {
        if (
          isNaN(row[0]) &&
          isNaN(row[1]) &&
          isNaN(row[2])
        ) {
          parsedDataCelsius.push({ key: idx, value: row });
        } else {
          const minTempInCelsius = convertFahToCel(row[2]);
          const maxTempInCelsius = convertFahToCel(row[1]);
          const rowCelsius = [
            row[0],
            maxTempInCelsius,
            minTempInCelsius
          ];
          parsedDataCelsius.push({ key: idx, value: rowCelsius });
        }

        parsedDataFahreinheit.push({ key: idx, value: row });
      }
    });

    return { parsedDataFahreinheit, parsedDataCelsius };
}