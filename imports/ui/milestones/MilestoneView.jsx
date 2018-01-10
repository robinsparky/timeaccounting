import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import { deleteMilestone } from '../../api/Projects/methods.js';
import MilestoneEditForm from './MilestoneEditForm';
import TaskContainer from '../tasks/TaskContainer.jsx';
import Helpers from '../../api/lib/helpers.js';

export default class MilestoneView extends Component {
    
static propTypes = {
  milestone: PropTypes.object
};
    constructor(props) {
        super(props);
        this.state = {parentUrl: props.loc
                    ,edit: false
                    ,projectId: props.projectId || ''
                    ,milestone: props.milestone || null
                    ,viewOnly: props.viewOnly || true
                }

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.deleteMilestone = this.deleteMilestone.bind(this);
        this.editMilestone = this.editMilestone.bind(this);        
        this.handleExpand = this.handleExpand.bind(this);        
    }

    deleteMilestone(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        let txt = '';
        if (confirm("Do you really want to delete this Milestone and all of its tasks?") == true) {
            txt = `Confirmed the deletion of milestone '${this.state.milestone.name}' in project='${this.state.projectId}'.`;
            const args = {
                projectId: this.state.projectId,
                milename: this.state.milestone.name
            }
            deleteMilestone.call(args, (error, response) => {
                if (error) {
                    Alert.error(error.message);
                } else {
                    Alert.success('Milestone deleted successfully');
                }
            });
        } else {
            txt = `Cancelled the deletion milestone '${this.state.milestone.name}' in project='${this.state.projectId}'.`;
        }
        console.log(txt);
    }

    editMilestone(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        console.log('Milestone.jsx: Editing...');
        this.setState({edit: !this.state.edit});
    }

    handleChange(event) {
        if('undefined' === typeof(event) || null === event) return;
        const target = event.target; 
        console.log("MilestoneView.jsx: Handle Change Event for %s with value '%s'",target.name,target.value);
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(target.type === 'date') {
            value = new Date(value);
        }
        this.setState(prevState=>{
            let mile = prevState.milestone;
            mile[name] = value;
            return {milestone: mile};
        });
    }

    handleReset(event) {
        if('undefined' === typeof(event) || null === event) return;
        const target = event.target; 
        //console.log("Milestone.jsx: Handle Reset Event for %s with value '%s'",target.name,target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({edit: !this.state.edit});
    }
    
    handleExpand(event) {
        if(null === event || undefined === event) return;
        this.setState(prevState=>{
            return {viewOnly: !prevState.viewOnly}
        });
    }

    render() {
        if(this.props.loading) return (<h1>Loading ... </h1>);

        return (
        <tbody>
            <tr>
                <td><a href="#" onClick={this.handleExpand}>{this.props.milestone.name}</a></td>
                <td>{this.props.milestone.desc}</td>
                <td>{this.props.milestone.expectedStart ? Helpers.getDateString(this.props.milestone.expectedStart) : ''}</td>
                <td>{this.props.milestone.expectedEnd ? Helpers.getDateString(this.props.milestone.expectedEnd) : ''}</td>
                <td><button className="editLink" onClick={this.editMilestone}>Edit</button>&nbsp;<button className="deleteLink" onClick={this.deleteMilestone}>Delete</button></td>
           </tr>
            {!this.state.edit ? null : <tr><td colSpan="5"><MilestoneEditForm projectId={this.props.projectId} 
                                                                            milestone={this.props.milestone} 
                                                                            handleChange={this.handleChange} 
                                                                            handleReset={this.handleReset} /></td></tr>}
            {!this.state.viewOnly ? <tr><td colSpan="5"><TaskContainer projectId={this.props.projectId} milename={this.props.milestone.name}/></td></tr> : null}
        </tbody>
        )
    }
}

