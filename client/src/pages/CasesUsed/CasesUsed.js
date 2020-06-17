import React from 'react';
import axios from 'axios';
import './CasesUsed.scss';

const apiURL = "http://localhost:8080";

class CasesUsed extends React.Component {

state = {
  usage: [],
  locations: [],
  items: [],
}

async componentDidMount() {
  const usageData = await axios.get(`${apiURL}/usage`);
  const locations = await axios.get(`${apiURL}/locations`);
  const items = await axios.get(`${apiURL}/items`);
  this.setState({
    usage: usageData.data,
    locations: locations.data,
    items: items.data,
  })
}

getItemName = itemID => {
  const item = this.state.items.find(item => item.id === itemID)
  return item.name
}

getLocationName = locationID => {
  const location = this.state.locations.find(location => location.id === locationID)
  return location.name
}

render() {
  return(
    <div className="usage">
      <div className="usage__hero">
        <h1 className="usage__header">Usage</h1>
        <h2 className="usage__title">Cases Used</h2>
      </div>
      <div className="usage__subtitles">
        <p className="usage__subtitles-timestamp">Timestamp</p>
        <p className="usage__subtitles-item">Item Name</p>
        <p className="usage__subtitles-location">Location</p>
        <p className="usage__subtitles-cases">Cases</p>
      </div>
      {
        this.state.usage.map(cases => {
          return(
            <div key={cases.id} className="usage__row">
              <p className="usage__row-timestamp">
                {cases.created_at.substring(0,10)}
              </p>
              <p className="usage__row-item">
                {this.getItemName(cases.item_id)}
              </p>
              <p className="usage__row-location">
                {this.getLocationName(cases.location_id)}
              </p>
              <p className="usage__row-cases">
                {cases.cases}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

}

export default CasesUsed;