import React from 'react';
import axios from 'axios';
import './NewItem.scss';

const apiURL = "http://localhost:8080";

class NewItem extends React.Component {

addItem = (e) => {
  console.log("adding", e)
  axios
  .post(`${apiURL}/items`, {
    id: e.target.id.value,
    name: e.target.name.value,
    cost: e.target.cost.value,
    unitsPerCase: e.target.unitsPerCase.value,
    kgPerCase: e.target.unitsPerCase.value,
  })
  .catch(err => console.error(err))
}

render() {
  return (
    <>
      <form onSubmit={this.addItem}>
        <input name="id" placeholder="ID"/>
        <input name="name" placeholder="Name"/>
        <input name="cost" placeholder="Cost"/>
        <input name="unitsPerCase" placeholder="units/Case"/>
        <input name="kgPerCase" placeholder="kg/Case"/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

}


export default NewItem;