import React from "react";
import ReactDOM from "react-dom";
import Table from "./table.js";
import data from "./data/results.json";

import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], w: 2, d: 0.5, l: 0, aw: 1, al: 0 };

    this.handleClassicalWinChange = this.handleClassicalWinChange.bind(this);
    this.handleArmageddonWinChange = this.handleArmageddonWinChange.bind(this);
    this.handleClassicalDrawChange = this.handleClassicalDrawChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.setState({players: data.players});
  }

  handleClassicalWinChange(event) {
    this.setState({ w: event.target.value });
  }

  handleClassicalDrawChange(event) {
    this.setState({ d: event.target.value });
  }

  handleArmageddonWinChange(event) {
    this.setState({ aw: event.target.value });
  }

  handleSelectChange(event) {
    switch(event.target.value) {
      case "nc":
        this.setState({ w: 2, d: 0.5, l: 0, aw: 1, al: 0 });
        break;
      case "regular":
        this.setState({ w: 1, d: 0.5, l: 0, aw: 0, al: 0 });
        break;
      case "hockey":
        this.setState({ w: 3, d: 1, l: 0, aw: 1, al: 0 });
        break;
      case "4210":
        this.setState({ w: 4, d: 1, l: 0, aw: 1, al: 0 });
    }
  }

  render() {
    const p = this.state.players.map(function(player) {
      return {
        ...player,
        score:
        player.classicalWins * this.state.w +
        player.classicalDraws * this.state.d +
        player.classicalLosses * this.state.l +
        player.armageddonWins * this.state.aw +
        player.armageddonLosses * this.state.al
      };
    }, this).
    sort((a, b) => b.score - a.score);

    return (
      <div className="wrapper">
        <h3>Norway Chess 2019 <span className="badge badge-secondary">Updated after round 3</span></h3>
        <div className="form-inline">
          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for classical win</div>
            </div>
            <input type="number" className="form-control" value={this.state.w} onChange={this.handleClassicalWinChange} />
          </div>

          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for classical draw</div>
            </div>
            <input type="number" className="form-control" value={this.state.d} onChange={this.handleClassicalDrawChange} />
          </div>

          <div className="input-group mb-4 mr-sm-4">
            <div className="input-group-prepend">
              <div className="input-group-text">Points for Armageddon win</div>
            </div>
            <input type="number" className="form-control" value={this.state.aw} onChange={this.handleArmageddonWinChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-1 col-form-label"><b>Preset</b></label>
          <div className="col-sm-4">
            <select className="form-control mb-2 mr-sm-2" onChange={this.handleSelectChange}>
              <option value="nc">Norway Chess</option>
              <option value="regular">Regular</option>
              <option value="hockey">Hockey</option>
              <option value="4210">4-2-1-0</option>
            </select>
          </div>
        </div>


        <Table players={p} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
