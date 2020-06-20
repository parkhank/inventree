import React from 'react';
import axios from 'axios';
import './Invoice.scss';

const apiURL = "http://localhost:8080";

class Invoice extends React.Component {

state = {
  locationList: [],
  itemList: [],
}

addCount = async (e) => {
  const location = this.state.locationList.find(
    location => location.name === e.target.location.value)
  await axios
  .put(`${apiURL}/inventory`, {
    item_id: e.target.id.value,
    location_id: location.id,
    cases: e.target.cases.value
  })
}

componentDidMount = async () => {
  const locations = await axios.get(`${apiURL}/locations`);
  this.setState({
    locationList: locations.data,
  })
  const items = await axios.get(`${apiURL}/items`);
  this.setState({
    itemList: items.data,
  })
}

render() {
  return(
    <div className="invoice">
      <div className="invoice__hero">
        <h1 className="invoice__header">Invoice</h1>
        <h2 className="invoice__title">
          Add to Inventories
        </h2>
      </div>
      <form
        className="invoice__form"
        onSubmit={this.addCount}>
        <select
          className="invoice__form-item"
          name="item">
          <option value="">Choose an item:</option>
          {
            this.state.itemList.map(item => {
              return(
              <option value={item.id}>{item.name}</option>
              )
            })
          }
        </select>
        <select
          className="invoice__form-location"
          name="location"
          placeholder="Location">
          <option value="">Choose a location:</option>
          {
            this.state.locationList.map(location => {
              return(
                <option value={location.name}>{location.name}</option>
              )
            })
          }
        </select>
        <input 
          className="invoice__form-cases"
          name="cases"
          placeholder="#"/>
        <button 
          className="invoice__form-button"
          type="submit">Add Cases</button>
      </form>
    </div>
  )
}

}

export default Invoice;