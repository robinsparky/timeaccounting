import React from 'react';
import {Route, Switch}  from 'react-router-dom';

//import TrackerReact from 'meteor/ultimatejs:tracker-react'

//import FamilyLayout from '../containers/FamilyLayout';
import ClientContainer from '../clients/ClientContainer.jsx';

export default class Maintenance extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <section id="maintenance-container" className="maintenance">
            <h1>Maintenance</h1>
            <ClientContainer />
        </section>
    );
  }
}