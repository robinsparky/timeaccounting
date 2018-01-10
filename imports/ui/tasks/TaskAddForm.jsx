import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6

import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';

import Helpers from '../../api/lib/helpers.js';
import {add} from '../../api/Tasks/methods.js';

export default class TaskAddForm extends Component {

    static propTypes = {
    milestone: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {task: {'projectId': this.props.projectId, 'milename': this.props.milename, 'name':'', 'expectedStart':'','expectedEffort': 0.0 }},
        this.props.handleReset = this.props.handleReset || function() {}
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    handleChange(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        let value = target.type === 'checkbox' || target.type === 'radio' ? target.checked : target.value;
        const name = target.name;
        if(target.type === 'date') {
            value = helpers.getDateFromString(value);
        }
        this.setState(prevState=>{
            let task = prevState.task || {};
            task[name] = value;
            return {task: task}
        });
    }

    handleReset(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        this.setState(prevState=>{
            let tsk = prevState.task;
            return {task: tsk}
    });
        this.props.handleReset(event); //lift up
    }

    saveTask(event) {
        event.preventDefault();
        if(this.state.task.name.length < 2) return;

        const args = {
            projectId: this.props.projectId,
            milename: this.props.milename,
            data: this.state.task
        };
        add.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Task added successfully',appConfig.alerts);
            }
        });
        this.handleReset(event);
    }

    render() {
        return (
            <div id="new-task-container" className="add-task">
                <form className="new-task-form" onSubmit={this.saveTask} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Add New Task</legend>
                        <label>
                            Name:
                        <input
                            name="name"
                            type="text"
                            maxLength ="50"
                            size="25"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.name ? this.state.task.name : ''}
                            />
                        </label>
                        <label>
                            Expected Start:
                        <input
                            name="expectedStart"
                            type="date"
                            maxLength ="10"
                            size="7"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.expectedStart ? Helpers.getDateString(this.state.task.expectedStart) : ''}
                            />
                        </label>
                        <label>
                            Expected Effort:
                        <input
                            name="expectedEffort"
                            type="number"
                            step = "0.1"
                            maxLength ="10"
                            size="7"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.expectedEffort ? this.state.task.expectedEffort : 0.0}
                            />
                        </label>
                        <br/>
                        <input type="submit" name="AddTask" value="Save"/>&nbsp;<input type="reset" name="reset" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}