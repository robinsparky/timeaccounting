import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ClientView from './ClientView';
import ClientAddForm from './ClientAddForm';

export default class ClientList extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
      this.state = {
          viewOnly: props.viewOnly || true,
          loading: props.loading,
          mode: props.mode || "ops",
          clientId: props.clientId || '',
          parentUrl: props.parentUrl || '',
          addMode: false,
          clickHandler: props.clickHandler || function() {},
       }

       this.data = props.data;
       this.addClient       = this.addClient.bind(this);
       this.handleAddCancel = this.handleAddCancel.bind(this);
       this.clickHandler = this.clickHandler.bind(this);
  }

  getClients() {
      return this.props.data;
  }

  addClient(event) {
      if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: !addMode};
        });
  }

  handleAddCancel(event) {
      if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: false};
        });
  }
    
  clickHandler(event) {
      if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const clientId = target.getAttribute("data-client-id");
        // console.log("ClientList: clickHandler: target... ",target);
        // console.log(`ClientId='${clientId}'`);
  }


  renderClients() {
    return this.getClients().map(client=>{
        return <ClientView viewOnly={this.state.viewOnly} mode={this.state.mode} parentUrl={this.parentUrl} clickHandler={this.clickHandler} key={client._id} client={client} />
    });
  }

  render() {
        return (
            <section id="clients-container">
                {this.state.addMode ? <ClientAddForm handleReset = {this.handleAddCancel} /> 
                                    :<span><button id="add-client-link" className="addNewLink" onClick={this.addClient}>New Client</button></span>}
                <div className="clients">
                    {this.renderClients()}
                </div>
            </section>
        )
    }
}