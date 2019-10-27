import React from "react";

const sortTypes = {
  up: {
    sortByDate: (a, b) => a.value[0] - b.value[0],
    sortByMinTemp: (a, b) => a.value[2] - b.value[2],
    sortByMaxTemp: (a, b) => a.value[1] - b.value[1]
  },
  down: {
    sortByDate: (a, b) => b.value[0] - a.value[0],
    sortByMinTemp: (a, b) => b.value[2] - a.value[2],
    sortByMaxTemp: (a, b) => b.value[1] - a.value[1]
  }
};

class SortableTable extends React.Component {
  state = {
    currentSort: "up",
    sortByColumn: ""
  };

  onSortChange = e => {
    const { currentSort } = this.state;
    const sortByColumn = e.target.getAttribute("value");

    let nextSort = "";

    if (currentSort === "down") {
      nextSort = "up";
    } else if (currentSort === "up") {
      nextSort = "down";
    }

    this.setState({
      currentSort: nextSort,
      sortByColumn
    });
  };

  render() {
    const { data } = this.props;

    const { currentSort, sortByColumn } = this.state;

    return (
      data &&
      data.length && (
        <table>
          <thead>
            <tr>
              <th onClick={this.onSortChange} value="sortByDate">
                {data[0].value[0]}
              </th>
              <th onClick={this.onSortChange} value="sortByMaxTemp">
                {data[0].value[1]}
              </th>
              <th onClick={this.onSortChange} value="sortByMinTemp">
                {data[0].value[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {[...data]
              .sort(sortTypes[currentSort][sortByColumn])
              .map((el, idx) => {
                if (idx === 0) {
                  return undefined;
                }
                return (
                  <tr key={idx}>
                    <td>{el.value[0]}</td>
                    <td>{el.value[1]}</td>
                    <td>{el.value[2]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )
    );
  }
}

export default SortableTable;
