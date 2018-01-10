import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';

import Alert from 'react-s-alert';
import {remove} from '../../api/Tasks/methods.js';
import TaskEditForm from './TaskEditForm';
import WorkRecordContainer from '../workrecords/WorkRecordContainer.jsx';

import Helpers from '../../api/lib/helpers.js';
import Config from '../../api/lib/config.js';

export default class TaskView extends Component {
static propTypes = {
  task: PropTypes.object.isRequired
};

static isBilledName = 'isBIlled';
static isBilledValues = ['YES','NO'];

    constructor(props) {
        super(props);
        this.state = {edit: false
                    ,task: props.task || {}
                    ,viewOnly: props.viewOnly || false
                    ,isBilledName: 'isBilled'
                    ,isBilledValues: ['YES','NO']
                }

         //Task handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleIsBilled = this.handleIsBilled.bind(this);
    }

    deleteTask(event) {
        if(null === event || undefined == event) return;
        event.preventDefault();
        let txt = '';
        if (confirm("Do you really want to delete this Task and all of its work records?") == true) {
            txt = `Confirmed the deletion task ='${this.props.task._id}'.`;

            const args = {
                taskId: this.props.task._id
            };

            remove.call(
                args
            , (error, response) => {
                if (error) {
                    Alert.error(error.message,Config.alerts);
                } else {
                    Alert.success('Task removed successfully',Config.alerts);
                }
            });

        } else {
            txt = `Cancelled the deletion task = '${this.props.task._id}'.`;
        }
        console.log(txt);
    }

    editTask(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        event.preventDefault();
        this.setState(prevState=>{
            return {edit: !prevState.edit}
        });
    }

    handleChange(event) {
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState=>{
            let task = prevState.task;
            if(name === this.state.isBilledName && value === this.state.isBilledValues[0] && target.checked) {
                task[name] = true;
            }
            else if(name === this.state.isBilledName && value === this.state.isBilledValues[1] && target.checked) {
                task[name] = false;
            }
            else {
            task[name] = value;
            }
            return {'task': task};
        });
    }

    handleIsBilled(val) {
        this.setState(prevState=>{
            let t = prevState.task;
            t.isBilled = val;
            return {'task': t};
        })
    }

    handleReset(event) {
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({edit: !this.state.edit});
    }

    render() {
    if(this.props.loading) return(<tbody><tr><td>Loading tasks ...</td></tr></tbody>)
    //console.log("TaskView: task object:",this.state.task);
    let expStartStr = Helpers.getDateString(this.state.task.expectedStart);
    let actStartStr = this.state.task.actualStart ? Helpers.getDateString(this.state.task.actualStart) : '';
    let actEndStr = this.state.task.actualEnd ? Helpers.getDateString(this.state.task.actualEnd) : '';
    let outlook = this.state.task.expectedEffort - this.state.task.actualEffort
    return (
        <tbody>
            <tr>
                <td>{this.state.task.name}</td>
                <td>{expStartStr}</td>
                <td>{this.state.task.expectedEffort}</td>
                <td>{actStartStr}</td>
                <td>{this.state.task.actualEffort}</td>
                <td>{outlook.toFixed(1)}</td>
                <td>{actEndStr}</td>
                <td>{this.state.task.billedEffort}</td>
                <td><button className="editLink" onClick={this.editTask}>Edit</button>&nbsp;
                    <button className="deleteLink" onClick={this.deleteTask}>Delete</button>&nbsp;</td>
            </tr>
            {!this.state.edit ? null : <tr><td colSpan="6"><TaskEditForm task={this.state.task} 
                                                                         handleChange={this.handleChange} 
                                                                         handleReset={this.handleReset} 
                                                                         handleIsBilled = {this.handleIsBilled} /></td></tr>}
            <tr><td colSpan="6"><WorkRecordContainer taskId={this.props.task._id} /></td></tr>
        </tbody>
    )
    }
}
