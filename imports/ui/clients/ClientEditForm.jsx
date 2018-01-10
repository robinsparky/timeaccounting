import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import Config from '../../api/lib/config.js';
import {update} from '../../api/Clients/methods.js';

export default class ClientEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {client: props.client || null
                     ,maxlength: 50
                     ,handleChange: props.handleChange || function() {}
                     ,handleReset: props.handleReset || function() {}
                     };

        // console.log("ClientEditForm: state...");
        // console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveClient = this.saveClient.bind(this);
    }

    // componentWillUnmount() {
    //     this.state.subscription.allClients.stop();
    // }

    handleChange(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(value.length >= this.state.maxlength-1) {
           console.log(`Input exceeds max length of ${this.state.maxlength}`);
           return;
        }
        this.setState({
            [name]: value
        });
        this.state.handleChange(event); //lift up
    }

    handleReset(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        const name = "name";
        this.setState({
            [name]: ''
        });
        this.state.handleReset(event); //lift up
    }

    saveClient(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        if(this.state.client.name.length < 2) return;
        //console.log(`saveClient with name=${this.state.client.name}`);
        const args = {
            clientId: this.state.client._id,
            data: this.state.client
        }
        
        update.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,Config.alerts);
            } else {
                Alert.success('Client updated successfully',Config.alerts);
            }
        });

        this.handleReset(event);
    }

    render() {

        return (
            <div id="edit-client-container" className="edit-client">
                <form className="edit-client-form" onSubmit={this.saveClient} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Edit Client</legend>
                        <label>
                            Name:&nbsp;
                        <input name="name"
                            type="text"
                            maxLength ={this.state.maxlength}
                            size={this.state.maxlength}
                            required
                            onChange = {this.handleChange}
                            value={this.state.client.name}
                            />
                        </label>
                        <input type="submit" name="SaveClient" value="Save"/>&nbsp;<input type="reset" name="Cancel" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}