import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';

import LoginButtons from './LoginButtons';

export default class Header extends React.Component {

  render() {
    return (
      <header className='Header'>
        <nav className="menu">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
            <NavLink activeClassName="active" exact to="/maint">Maintenance</NavLink>
            <NavLink activeClassName="active" exact to="/reports">Reports</NavLink>
            <NavLink activeClassName="active" to="/about">About Page</NavLink>
            <LoginButtons align='right' />
        </nav>
      </header>
    );
  }
}
