import React from 'react';
import axios from 'axios';
import './Items.scss';

const apiURL = "http://localhost:8080";

class Items extends React.Component {

addItem = async (e) => {
  e.preventDefault();
  if (e.target.measure.value === "unitsPerCase") {
    await axios
    .post(`${apiURL}/items`, {
      id: e.target.id.value,
      name: e.target.name.value,
      cost: e.target.cost.value,
      unitsPerCase: e.target.number.value,
    })
    .catch(err => console.error(err))
  } else {
    await axios
    .post(`${apiURL}/items`, {
      id: e.target.id.value,
      name: e.target.name.value,
      cost: e.target.cost.value,
      kgPerCase: e.target.number.value,
    })
    .catch(err => console.error(err))
  }
  this.props.history.push("/");
}

deleteItem = async (e) => {
  e.preventDefault();
  await axios
  .delete(`${apiURL}/items`, {
    data: { id: e.target.id.value }
  })
  .catch(err => console.error(err))
  this.props.history.push("/");
}

render() {
  return (
    <div className="items">
      <div className="items__hero">
        <h1 className="items__header">Edit Items</h1>
        <h2 className="items__title">
          Add or Remove Items
        </h2>
      </div>
      <form
        className="items__newForm"
        onSubmit={this.addItem}>
        <div className="items__newFormLeft">
          <div className="items__newFormTop">
            <input
              className="items__newFormID"
              name="id"
              placeholder="ID"/>
            <input
              className="items__newFormName"
              name="name"
              placeholder="Name"/>
          </div>
          <div className="items__newFormBottom">
            <input
              className="items__newFormCost"
              name="cost"
              placeholder="Cost"/>
            <input
              className="items__newFormNumber"
              name="number"
              placeholder="#"/>
            <select 
              className="items__newFormMeasure"
              name="measure">
              <option value="">Choose a measure: </option>
              <option value="unitsPerCase">Units/Case</option>
              <option value="kgPerCase">Kg/Case</option>
            </select>
          </div>
        </div>
        <div className="items__newFormRight">
          <button
            className="items__button"
            type="submit">Create Item</button>
        </div>
      </form>
      <form
        className="items__deleteForm"
        onSubmit={this.deleteItem}>
        <div className="items__deleteFormLeft">
          <input
            className="items__deleteFormID"
            name="id"
            placeholder="ID"/>
        </div>
        <div className="items__deleteFormRight">
          <button
            className="items__button"
            type="submit">Delete Item</button>
        </div>
      </form>
    </div>
  )
}

}


export default Items;