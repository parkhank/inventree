import React from 'react';
import logo from '../../assets/logo.png';
import './Navigation.scss';

class Navigation extends React.Component {

state = {
  branchOpen: true,
  countOpen: false,
  usageOpen: false,
}

handleBranchToggle = () => {

}

handleCountToggle = () => {

}

handleUsageToggle = () => {

}

render() {
  return (
    <div className="navigation">
      <div className="navigation__left">
        <img
          className="navigation__logo"
          src={logo}
          alt="logo" />
      </div>
      <div className="navigation__right">
        <div className="navigation__dropdown">
          <p className="navigation__dropdownTitle">Branch</p>
          { 
            (this.state.branchOpen)
              ? <ul className="navigation__dropdownList">
                  <li className="navigation__dropdownItem">Sherbourne</li>
                  <li className="navigation__dropdownItem">Jarvis</li>
                  <li className="navigation__dropdownItem">Huntley</li>
                </ul>
              : null
          }
        </div>
        <div className="navigation__dropdown">
          Count
        </div>
        <div className="navigation__dropdown">
          Usage
        </div>
        <div className="navigation__dropdown">
          Invoice
        </div>
      </div>
    </div>
  )
}

}


export default Navigation;