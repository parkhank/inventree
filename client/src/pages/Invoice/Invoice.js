import React from 'react';
import axios from 'axios';
import './Invoice.scss';

const apiURL = "http://localhost:8080";

class Invoice extends React.Component {

state = {
  locationList: [],
  itemList: [],
  item_id: "Item ID",
  location_id: "",
  cases: '',
}

changeHandle = (e, id) => {
  // console.log('changing state of', id, 'with', e.target.value);
  // FROM: invoice form <select> x2 and <input>
  this.setState({
    [id]: e.target.value
  })
}

addCount = async (e) => {
  e.preventDefault();
  // console.log('state pre-add', this.state)
  // TO: inventory.js router"/" .put
  await axios
  .put(`${apiURL}/inventory`, {
    item_id: this.state.item_id,
    location_id: this.state.location_id,
    cases: this.state.cases,
  })
  await this.setState({
    item_id: "",
    location_id: "",
    cases: "",
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
        <div className="invoice__form-top">
          <div className="invoice__form-itemID">
            {this.state.item_id}
          </div>
          <select
            className="invoice__form-item"
            name="item"
            value={this.state.item_id}
            onChange={e => {this.changeHandle(e, "item_id")}}>
            <option value="Item ID">Choose an item:</option>
            {
              this.state.itemList.map(item => {
                return(
                <option
                  key={item.id}
                  value={item.id}>
                  {item.name}
                </option>
                )
              })
            }
          </select>
          <button 
            className="invoice__form-button"
            type="submit">Add Cases</button>
        </div>
        <div className="invoice__form-bottom">
          <select
            className="invoice__form-location"
            name="location"
            value={this.state.location_id}
            onChange={e => this.changeHandle(e, "location_id")}>
            <option value="">Choose a location:</option>
            {
              this.state.locationList.map(location => {
                return(
                  <option
                    key={location.id}
                    value={location.id}>
                    {location.name}
                  </option>
                )
              })
            }
          </select>
          <input 
            className="invoice__form-cases"
            name="cases"
            value={this.state.cases}
            placeholder="#"
            onChange={e => {
              this.changeHandle(e, "cases")}}/>
        </div>
      </form>
    </div>
  )
}

}

export default Invoice;