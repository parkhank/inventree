import React from 'react';
import axios from 'axios';
import './Inventory.scss';

const apiURL = "http://localhost:8080";

class Inventory extends React.Component {

state = {
  inventoryPage: [],
  locations: [],
}

async componentDidMount() {
  const inventories = await axios.get(`${apiURL}/inventory`);
  const locations = await axios.get(`${apiURL}/locations`);
  this.setState({
    inventoryPage: inventories.data,
    locations: locations.data,
  })
}

handleDisplayInventory = location => {
  return (
    <div className="inventory">
      <div className="inventory__hero">
        <h1 className="inventory__header">Inventory</h1>
        <h2 className="inventory__title">
          {this.props.match.params.locationID}
        </h2>
      </div>
      <div className="inventory__subtitles">
        <p className="inventory__subtitlesItemID">Item ID</p>
        <p className="inventory__subtitlesItemName">Item Name</p>
        <p className="inventory__subtitlesCases">Cases</p>
      </div>
      {
        this.state.inventoryPage
          .filter(row => location === row.location_details.name)
          .map(inventory => {
            return (
              <div key={inventory.id} className="inventory__row">
                <p className="inventory__rowItemID">{inventory.item_id}</p>
                <p className="inventory__rowItemName">{inventory.item_details.name}</p>
                <p className="inventory__rowCaseNumber">{inventory.cases}</p>
              </div>
            )
          })
      }
    </div>
  )
}

handleDisplayInventoryAll = () => {
  const inventoryPageAll = [];
  for (let i = 0; i < this.state.inventoryPage.length; i += this.state.locations.length) {
    inventoryPageAll.push(
      {
        ...this.state.inventoryPage[i],
        cases:
          this.state.locations.map((location, index) => {
            return(
              this.state.inventoryPage[i + index].cases
            )
          })
      }
    )
  }
  return(
    <div className="inventory">
      <div className="inventory__hero">
        <h1 className="inventory__header">Inventory</h1>
        <h2 className="inventory__title">
          all locations
        </h2>
      </div>
      <div className="inventory__subtitles">
        <p className="inventory__subtitlesItemID">Item ID</p>
        <p className="inventory__subtitlesItemName">Item Name</p>
        {
          this.state.locations.map((location, i) => {
            return(
              <p key={i} className="inventory__subtitlesCases">
                {location.name}
              </p>
            )
          })
        }
      </div>
      {
        inventoryPageAll.map(row => {
          return(
              <div key={row.id} className="inventory__row">
                <p className="inventory__rowItemID">{row.item_id}</p>
                <p className="inventory__rowItemName">{row.item_details.name}</p>
                <div className="inventory__rowCases">
                  {
                    row.cases.map((cases, i) => {
                      return(
                        <p key={i} className="inventory__rowCaseNumber">{cases}</p>
                      )
                    })
                  }
                </div>
              </div>
          )
        })
      }
    </div>
  )
}

render() {
  return(
    <>
      {
        (this.props.match.params.locationID)
        ? this.handleDisplayInventory(this.props.match.params.locationID)
        : this.handleDisplayInventoryAll()
      }
    </>
  )
}

}

export default Inventory;