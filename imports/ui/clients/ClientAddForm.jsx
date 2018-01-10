import React, {Component} from 'react';

import Alert from 'react-s-alert';

import Config from '../../api/lib/config.js';
import {add} from '../../api/Clients/methods.js';

export default class ClientAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''
                     ,handleChange: props.handleChange || function() {}
                     ,handleReset: props.handleReset || function() {}
                     };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveClient = this.saveClient.bind(this);
    }

    handleChange(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
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
        event.preventDefault();
        if(this.state.name.length < 2) return;
        
        const args = {
            data: {
                name: this.state.name
            }
        };

        add.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,Config.alerts);
            } else {
                Alert.success("Client added successfully",Config.alerts);
            }
        });

        this.handleReset(event);
    }

    render() {
        return (
            <div id="new-client-container" className="add-client">
                <form className="new-project-form" onSubmit={this.saveClient} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Add New Client</legend>
                        <label>
                            Name:&nbsp;
                        <input
                            name="name"
                            type="text"
                            maxLength ="50"
                            size="25"
                            required
                            onChange = {this.handleChange}
                            value={this.state.name}
                            />
                        </label>
                        &nbsp;
                        <input type="submit" name="AddClient" value="Add"/>&nbsp;<input type="reset" name="reset" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}