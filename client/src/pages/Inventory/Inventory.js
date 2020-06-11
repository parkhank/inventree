import React from 'react';
import './Inventory.scss';
import exampleItemsData from '../../example_data/exampleItemsData';

class Inventory extends React.Component {

state = {
  inventory: exampleItemsData,
}

handleDisplayInventory = location => {
  // change this to make a query based on location
  // (location) ? location query : full query
  return (
    <div className="inventory">
      <h2 className="inventory__title">
        {
          this.props.match.params.locationID || "all inventory"
        }
      </h2>
      {
        this.state.inventory
          .filter(item => 
            (location)
            ? location === item.location
            : item.location)
          .map(item => {
          return (
            <div className="inventory__item">
              <p className="inventory__itemID">{item.id}</p>
              <p className="inventory__itemDetails">{item.name}</p>
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
        this.handleDisplayInventory(this.props.match.params.locationID)
      }
    </>
  )
}

}

export default Inventory;