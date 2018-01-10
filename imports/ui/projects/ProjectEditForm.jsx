import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';

import {update} from '../../api/Projects/methods.js';

export default class ProjectEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {project: props.project || {}
                    ,parentUrl: '/maint'
                    ,maxLength: 100
                    ,handleChange: props.handleChange || function() {}
                    ,handleReset: props.handleReset || function() {}
                };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    handleChange(event) {
        if('undefined' === typeof(event) || null === event) return;
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState=>{
            let proj = prevState.project;
            proj[name] = value;
            return {project: proj}
        });
        this.state.handleChange(event); //lift up
    }

    handleReset(event) {
        if(null === event || 'undefined' === typeof(event)) return;
        event.preventDefault();
        this.state.handleReset(event); //lift up
    }

    saveProject(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();

        const args = {
            projectId: this.state.project._id,
            data: this.state.project
        }
        
        update.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Project updated successfully',appConfig.alerts);
            }
        });
        this.handleReset(event);
    }

    render() {
        return (
            <div id="edit-project-container" className="edit-project">
                <form className="new-project-form" onSubmit={this.saveProject} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Edit Project</legend>
                        <label>
                            Project Name:
                        <input name="name"
                            type="text"
                            maxLength ={this.state.maxLength}
                            size="50"
                            required
                            onChange = {this.handleChange}
                            value={this.state.project.name}
                            />
                        </label>
                        <input type="submit" name="SaveProject" value="Save"/>&nbsp;<input type="reset" name="Cancel" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}