import React from 'react'

const Température = (props) => {
    const {
        tempmin,
        tempmax,
        tempmoy
    } = props
    return <div className="temperature-display">
    <p className="temperature-display-avg">{tempmoy}</p>
    <div className="temperature-display-row">
      <p>{tempmax}</p>
      <p className="temperature-display-row-item--min">
        {tempmin}
      </p>
    </div>
  </div>
}
export default Température