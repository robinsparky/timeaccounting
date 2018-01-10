import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6

import Helpers from '../../api/lib/helpers.js';
import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';
import {update} from '../../api/Tasks/methods.js';

export default class TaskEditForm extends Component {

static propTypes = {
  task: PropTypes.object
};

static isBilledValues = ['YES','NO'];
static step = 0.1;

    constructor(props) {
        super(props);
        this.state = {consttask: props.task || {}
                     ,task: props.task || {}
                     ,handleChange: props.handleChange || function() {}
                     ,handleReset: props.handleReset || function() {}
                     };
        this.resetTask = this.state.task;
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.handleIsBilled = this.handleIsBilled.bind(this);
    }

    handleChange(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(target.type === 'date') {
            value = helpers.getDateFromString(value);
        }
        this.setState(prevState=>{
            let task = prevState.task;
            task[name] = value;
            return {'task': task};
        });
        this.state.handleChange(event); //lift up
    }

    handleIsBilled(event){
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' || target.type === 'radio' ? target.checked : target.value;
        const name = target.name;
        console.log("TaskEditForm: name='%s' and value=%s",name,value);
        this.setState(prevState=>{
            let t = prevState.task;
            t.isBilled = value;
            return {'task': t};
        })
        this.props.handleIsBilled(value);
    }
    
    handleReset(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        this.setState(prevState=>{
            return {task: this.resetTask}
        });
        this.state.handleReset(event); //lift up
    }

    saveTask(event) {
        event.preventDefault();
        if(this.state.task.name.length < 2) return;
        
        const args = {
            taskId: this.state.task._id,
            data: this.state.task
        }
        console.log("TaskEditForm: args:",args);
        update.call(args,(error, response) => {
            if (error) {
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Task updated successfully',appConfig.alerts);
            }
        });
        this.handleReset(event);
    }

    render() {
        let expStartStr = this.state.task.expectedStart ? Helpers.getDateString(this.state.task.expectedStart) : '';
        let actStartStr = this.state.task.actualStart ? Helpers.getDateString(this.state.task.actualStart) : '';
        let actEndStr = this.state.task.actualEnd ? Helpers.getDateString(this.state.task.actualEnd) : '';
        return (
            <div id="edit-task-container" className="edit-task">
                <form className="edit-task-form" onSubmit={this.saveTask} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Edit Task</legend>
                        <label>
                            Name:
                        <input
                            name="name"
                            type="text"
                            maxLength ="50"
                            size="25"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.name}
                            />
                        </label>
                        <br/>
                        <label>
                            Expected Start:
                        <input
                            name="expectedStart"
                            type="date"
                            size="8"
                            required
                            onChange = {this.handleChange}
                            value={expStartStr}
                            />
                        </label>
                        <br/>
                        <label>
                            Expected Effort:
                        <input
                            name="expectedEffort"
                            type="number"
                            step={TaskEditForm.step}
                            size="5"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.expectedEffort ? this.state.task.expectedEffort : 0.0}
                            />
                        </label>
                        <br/>
                        <label>
                            Actual Start:
                        <input
                            name="actualStart"
                            type="date"
                            size="8"
                            onChange = {this.handleChange}
                            value={actStartStr}
                            />
                        </label>
                        <br/>
                        <label>
                            Actual End:
                        <input
                            name="actualEnd"
                            type="date"
                            size="8"
                            onChange = {this.handleChange}
                            value={actEndStr}
                            />
                        </label>
                        <br/>
                        <label>
                            Billed Effort:
                        <input
                            name="billedEffort"
                            type="number"
                            step={TaskEditForm.step}
                            size="5"
                            required
                            onChange = {this.handleChange}
                            value={this.state.task.billedEffort ? this.state.task.billedEffort : 0.0}
                            />
                        </label>
                        <br/>
                        <input type="submit" name="EditTask" value="Save"/>&nbsp;<input type="reset" name="reset" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}