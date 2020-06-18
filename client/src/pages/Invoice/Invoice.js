import React from 'react';
import axios from 'axios';
import './Invoice.scss';

const apiURL = "http://localhost:8080";

class Invoice extends React.Component {

state = {
  locationList: [],
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
        <input
          className="invoice__form-ID"
          name="id"
          placeholder="ID"/>
        <input 
          className="invoice__form-name"
          name="location"
          placeholder="Location"/>
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