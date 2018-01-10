import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import Config from '../../api/lib/config.js';
import ClientEditForm from './ClientEditForm';
import ProjectContainer from '../projects/ProjectContainer.jsx';
import {remove} from '../../api/Clients/methods.js';

export default class ClientView extends Component {

static propTypes = {
  client: PropTypes.object
};

    constructor(props) {
        super(props);
        this.state = {edit: false,
                    parentUrl: '/maint',
                    client: props.client || {name:''},
                    viewOnly: props.viewOnly || false,
                    mode: props.mode || "ops"
               }

        this.client = props.client || null
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
        this.editClient = this.editClient.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.onHover = this.onHover.bind(this);
        this.parentClickHandler = props.clickHandler || function() {};
    }

    /* Life cycle methods
  componentDidMount() {
    console.log("ClientView: componentDidMount");
  }

  componentWillUnMount() {
    console.log("ClientView: componentWillUnMount");
      //this.state.subscription.projsHandle.stop();
  }

  componentDidUnMount() {
    console.log("ClientView: componentDidUnMount");
  }

    shouldComponentUpdate() {
        console.log("ClientView: shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        console.log("ClientView: componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("ClientView: componentDidUpdate");
    }
    */

    handleExpand(event) {
        if(null === event || undefined === event) return;
        this.setState(prevState=>{
            return {viewOnly: !prevState.viewOnly}
        });
        this.parentClickHandler(event);
        //this.render();
    }

    deleteClient(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        let txt = '';
        if (confirm("Do you really want to delete this Client and all of its projects?") == true) {
            txt = `Confirmed the deletion of client='${this.state.client._id}'.`;
        
            const args = {
                clientId: this.state.client._id
            };

            remove.call(
                args
            , (error, response) => {
                if (error) {
                    Alert.error(error.message,Config.alerts);
                } else {
                    Alert.success('Client removed successfully',Config.alerts);
                }
            });
            
        } else {
            txt = `Cancelled the deletion of client='${this.state.client._id}'.`;
        }
        console.log(txt);
    }

    editClient(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        this.setState({edit: true});
    }

    handleChange(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState=>{
            let c = prevState.client;
            c[name] = value;
            return {client: c};
        });
    }

    handleReset(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        //console.log("Client.jsx: Handle Reset Event for %s with value '%s'",target.name,target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({edit: !this.state.edit});
    }

    onHover(event) {
        if(undefined === event || null === event) return;
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // console.log("ClientView.jsx: onHover Event:");
        // console.log(target);
    }

    render() {
        return (
            <article className='client'>
                <h3><a data-client-id={this.state.client._id} href="#" onClick={this.handleExpand} onMouseOver={this.onHover}>{this.state.client.name}</a></h3>
                {!this.state.edit ? <div>&nbsp;&rArr;&nbsp;<button className="editLink" onClick={this.editClient}>Edit</button>
                                    &nbsp;<button className="deleteLink" onClick={this.deleteClient}>Delete</button></div>
                                : <ClientEditForm client={this.state.client} handleChange={this.handleChange} handleReset={this.handleReset} />}
                    {!this.state.viewOnly ? <ProjectContainer id={this.state.client._id}/> : null}
            </article>
        )
    }
}

