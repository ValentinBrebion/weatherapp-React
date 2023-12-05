import React, { Component } from 'react'
import WeatherCode from '../../src/components/WeatherCode'

class ForecastItem extends Component {
    render() {
        return <li className="forecast-item">
        <p>
          {this.props.date}
        </p>
        <WeatherCode code={this.props.imgSrc} />
        <p className="forecast-item-temp">
          {this.props.ForeTemp}
        </p>
      </li>
    }
}

export default ForecastItem