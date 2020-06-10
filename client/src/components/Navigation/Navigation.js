import React from 'react';
import { Link } from 'react-router-dom';
import OutsideClick from 'react-outclick';
import logo from '../../assets/logo.png';
import './Navigation.scss';

class Navigation extends React.Component {

state = {
  branchOpen: false,
  countOpen: false,
  usageOpen: false,
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
                  <Link to="/branch/sherbourne"><li className="navigation__dropdownItem">Sherbourne</li></Link>
                  <Link to="/branch/jarvis"><li className="navigation__dropdownItem">Jarvis</li></Link>
                  <Link to="/branch/huntley"><li className="navigation__dropdownItem">Huntley</li></Link>
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
                  <Link to="/count/sherbourne"><li className="navigation__dropdownItem">Sherbourne</li></Link>
                  <Link to="/count/jarvis"><li className="navigation__dropdownItem">Jarvis</li></Link>
                  <Link to="/count/huntley"><li className="navigation__dropdownItem">Huntley</li></Link>
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
                  <Link to="/usage/sherbourne"><li className="navigation__dropdownItem">Sherbourne</li></Link>
                  <Link to="/usage/jarvis"><li className="navigation__dropdownItem">Jarvis</li></Link>
                  <Link to="/usage/huntley"><li className="navigation__dropdownItem">Huntley</li></Link>
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
      </div>
    </div>
  )
}

}


export default Navigation;