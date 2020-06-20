import React from 'react';
import axios from 'axios';
import './Count.scss';

const apiURL = "http://localhost:8080";

class Count extends React.Component {

state = {
  itemList: [],
}

changeHandle = (e, id) => {
  this.setState({
    [id]: e.target.value
  });
}

submitCounts = async (e) => {
  e.preventDefault();
  const countList = {
    counts: [],
  };
  this.state.itemList.forEach(item => {
    const input = this.state[item.id];
    countList.counts.push({
      item_id: item.id,
      cases: input,
    })
  });
  await axios
  .post(`${apiURL}/inventory/${this.props.match.params.locationID}`, countList)
  .catch(err => console.error(err));
  await axios
  .put(`${apiURL}/inventory/${this.props.match.params.locationID}`, countList)
  .catch(err => console.error(err));
  await this.props.history.push(`/branch/${this.props.match.params.locationID}`)
}

async componentDidMount() {
  const items = await axios.get(`${apiURL}/items`)
  this.setState({
    itemList: items.data,
  })
}

render() {
  return(
    <div className="count">
      <div className="count__hero">
        <h1 className="count__header">Counts</h1>
        <h2 className="count__title">
          {this.props.match.params.locationID}
        </h2>
      </div>
      <div className="count__subtitles">
        <p className="count__subtitles-ID">Item ID</p>
        <p className="count__subtitles-name">Item Name</p>
        <p className="count__subtitles-count">Count</p>
      </div>
      <form
        className="count__form"
        onSubmit={this.submitCounts}>
        {
          this.state.itemList.map(item => {
            return(
              <div key={item.id} className="count__row">
                <p className="count__row-ID">{item.id}</p>
                <p className="count__row-name">{item.name}</p>
                <input
                  className="count__row-count"
                  name={`${item.id}`}
                  placeholder="#"
                  onChange={e => {
                    this.changeHandle(e, item.id)}}/>
              </div>
            )
          })
        }
        <button
          className="count__button"
          type="submit">Submit Count</button>
      </form>
    </div>
  )
}

}

export default Count;