import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import ProjectEditForm from './ProjectEditForm';
import MilestoneList from '../milestones/MilestoneList';
import {remove} from '../../api/Projects/methods.js';

export default class ProjectView extends Component {
    static propTypes= {
        project: PropTypes.object
        };

    constructor(props) {
        super(props);
        this.state = {parentUrl: "/maint"
                    ,edit: false
                    ,recordTime: false
                    ,projectId: props.projectId || ''
                    ,project: props.project || null
                    ,style: {position: "absolute", top: "500px", left: "500px", color: "red", border:"2px solid black"}
                    ,viewOnly: props.viewOnly || false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.editProject = this.editProject.bind(this);
    }

    deleteProject(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        let txt = '';
        if (confirm("Do you really want to delete this Project and all of its tasks?") == true) {
            txt = `Confirmed the deletion project='${this.state.projectId}'.`;

            const args = {
                projectId: this.state.projectId
            };

            remove.call(
                args
            , (error, response) => {
                if (error) {
                    Alert.error(error.message);
                } else {
                    Alert.success('Project removed successfully');
                }
            });
            
        } else {
            txt = `Cancelled the deletion project='${this.state.projectId}'.`;
        }
        console.log(txt);
    }

    editProject(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        this.setState({edit: !this.state.edit});
    }

    handleChange(event) {
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        const target = event.target;
        //console.log(`ProjectView.jsx: Handle Change Event for '${target.name}' with value '${target.value}'`);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState=>{
            let proj = prevState.project;
            proj[name] = value;
            return {project: proj};
        });
    }

    handleReset(event) {
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        const target = event.target;
        console.log("Project.jsx: Handle Reset Event for %s with value '%s'",target.name,target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({edit: !this.state.edit});
    }

    render() {
        if(this.state.recordTime) {
            
        }
        return (
        <article className="project">
                <span>{this.props.project.name}</span>
                <span>&nbsp;&rArr;&nbsp;<button className="editLink" onClick={this.editProject}>Edit</button>&nbsp;<button className="deleteLink" onClick={this.deleteProject}>Delete</button></span>
            {!this.state.edit ? null : <div className="edit-project-container"><ProjectEditForm projectId={this.props.projectId} 
                                                        project={this.props.project} 
                                                        handleChange={this.handleChange} 
                                                        handleReset={this.handleReset} /></div>}
            <MilestoneList projectId={this.props.projectId} milestones={this.props.project.milestones}/>
        </article>
        )
    }
}

