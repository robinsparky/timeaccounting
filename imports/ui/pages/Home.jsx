import React from 'react';
import classNames from 'classnames';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Clock  from '../components/Clock';

function Home() {
  return (
    <div className={classNames('Home', 'foo', 'bar')} >
      <h1>Welcome to Grayware Time Accounting System</h1>
      <Clock title="Keeping track of time ..."/>
    </div>
  );
}

export default Home;
