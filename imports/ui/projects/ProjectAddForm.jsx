import React, {Component} from 'react';

import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';
import {add} from '../../api/Projects/methods.js';

export default class ProjectAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: props.clientId || ''
           ,pname: ''
           ,pdesc: ''
           ,handleReset: props.handleReset || function() {}
           ,handleChange: props.handleChange || function() {}
        }

        this.addProject = this.addProject.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
   handleReset(event) {
        if(null === event || 'undefined' === typeof(event)) return;
        event.preventDefault();
        this.state.handleReset(event); //lift up
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

    addProject(event) {
        if(null === event || 'undefined' === typeof(event)) return;
        event.preventDefault();
        const args = {
            data: {'name': this.state.pname,
                   'clientId': this.state.clientId
                }
        };

        add.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Project added successfully',appConfig.alerts);
            }
        });

        this.handleReset(event);
    }

    render() {
        return (
            <div id="new-project-container" className="add-project">
                <form className="new-project-form" onSubmit={this.addProject} onChange={this.handleChange} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Add New Project</legend>
                        <label>Name:
                            <input
                                type="text"
                                name="pname"
                                value={this.state.pname}
                                size="50"
                                required
                                />
                        </label>
                        <input type="submit" name="AddProject" value="Add"/>&nbsp;<input type="reset" name="reset" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}