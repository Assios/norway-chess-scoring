import React from "react";

const TableRow = ({ row, rowNumber }) => (
  <tr>
    <th scope="row">{rowNumber}</th>
    <td>{row.name}</td>
    <td><b>{row.score}</b></td>
    <td>{row.classicalWins}</td>
    <td>{row.classicalDraws}</td>
    <td>{row.classicalLosses}</td>
    <td>{row.armageddonWins}</td>
    <td>{row.armageddonLosses}</td>
  </tr>
);

class Table extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col" title="Classical wins">W</th>
            <th scope="col" title="Classical draws">D</th>
            <th scope="col" title="Classical losses">L</th>
            <th scope="col" title="Armageddon wins">AW</th>
            <th scope="col" title="Armageddon losses">AL</th>
          </tr>
        </thead>
        <tbody>
          {this.props.players.map((item, key) => (
            <TableRow key={key} row={item} rowNumber={key + 1} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
