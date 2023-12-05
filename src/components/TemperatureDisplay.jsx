import React, { Component } from 'react'

class TemperatureDisplay extends Component {

  render(){
    return <div className="temperature-display">
    <p className="temperature-display-avg">{this.props.tempmoy}</p>
    <div className="temperature-display-row">
      <p>{this.props.tempmax}</p>
      <p className="temperature-display-row-item--min">
        {this.props.tempmin}
      </p>
    </div>
  </div>
  }
}

export default TemperatureDisplay