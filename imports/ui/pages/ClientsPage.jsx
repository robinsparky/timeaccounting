import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import ClientAddForm from '../components/ClientAddForm';
import ClientList from '../components/ClientList';


export default class ClientsPage extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div id="maintain-clients-container" className="maintain-clients left-side">
            <ClientList />
            <ClientAddForm />
        </div>
    );
  }
}