import React from 'react';
import { Link } from 'react-router-dom';
import OutsideClick from 'react-outclick';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './Navigation.scss';

const apiURL = "http://localhost:8080";

class Navigation extends React.Component {

state = {
  branchOpen: false,
  countOpen: false,
  usageOpen: false,
  locations: [],
}

handleBranchToggle = () => {
  (!this.state.branchOpen)
    ? this.setState({
      branchOpen: true,
      countOpen: false,
      usageOpen: false,
    })
    : this.setState({
      branchOpen: false,
      countOpen: false,
      usageOpen: false,
    })
}

handleCountToggle = () => {
  (!this.state.countOpen)
    ? this.setState({
      branchOpen: false,
      countOpen: true,
      usageOpen: false,
    })
    : this.setState({
      branchOpen: false,
      countOpen: false,
      usageOpen: false,
    })
}

handleUsageToggle = () => {
  (!this.state.usageOpen)
    ? this.setState({
      branchOpen: false,
      countOpen: false,
      usageOpen: true,
    })
    : this.setState({
      branchOpen: false,
      countOpen: false,
      usageOpen: false,
    })
}

async componentDidMount() {
  const locations = await axios.get(`${apiURL}/locations`);
  const dropdowns = [];
  locations.data.forEach(location => {
    dropdowns.push(location.name)
  })
  this.setState({
    ...this.state,
    locations: dropdowns,
  })
}

render() {
  return (
    <div className="navigation">
      <div className="navigation__left">
        <Link to="/">
          <img
            className="navigation__logo"
            src={logo}
            alt="logo" />
        </Link>
      </div>
      <div className="navigation__right">
        <div className="navigation__dropdown">
          <p
            className="navigation__dropdownTitle"
            onClick={this.handleBranchToggle}>Branch</p>
          { 
            (this.state.branchOpen)
              ? <OutsideClick onOutsideClick={e => {
                this.setState({ branchOpen: false })
                }}>
                <ul className="navigation__dropdownList">
                  {
                    this.state.locations.map((location, i) => {
                      return(
                        <Link key={i} to={`/branch/${location}`}>
                          <li className="navigation__dropdownItem">{location}</li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </OutsideClick>
              : null
          }
        </div>
        <div className="navigation__dropdown">
          <p
            className="navigation__dropdownTitle"
            onClick={this.handleCountToggle}>Count</p>
          { 
            (this.state.countOpen)
              ? <OutsideClick onOutsideClick={e => {
                this.setState({ countOpen: false })
                }}>
                <ul className="navigation__dropdownList">
                  {
                    this.state.locations.map((location, i) => {
                      return(
                        <Link key={i} to={`/count/${location}`}>
                          <li className="navigation__dropdownItem">{location}</li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </OutsideClick>
              : null
          }
        </div>
        <div className="navigation__dropdown">
          <p
            className="navigation__dropdownTitle"
            onClick={this.handleUsageToggle}>Usage</p>
          { 
            (this.state.usageOpen)
              ? <OutsideClick onOutsideClick={e => {
                this.setState({ usageOpen: false })
                }}>
                <ul className="navigation__dropdownList">
                  {
                    this.state.locations.map((location, i) => {
                      return(
                        <Link key={i} to={`/usage/${location}`}>
                          <li className="navigation__dropdownItem">{location}</li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </OutsideClick>
              : null
          }
        </div>
        <div className="navigation__dropdown">
          <Link to="/invoice">
            <p className="navigation__dropdownTitle">Invoice</p>
          </Link>
        </div>
        <div className="navigation__dropdown">
          <Link to="/items">
            <p className="navigation__dropdownTitle">Edit Items</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

}


export default Navigation;