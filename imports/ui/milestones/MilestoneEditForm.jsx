import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6

import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';

import Helpers from '../../api/lib/helpers.js';
import { upsertMilestone } from '../../api/Projects/methods.js';

export default class MilestoneEditForm extends Component {  

static propTypes = {
  milestone: PropTypes.object
};

    constructor(props) {
        super(props);
        this.state = {milestone: props.milestone || {}
                     ,projectId: props.projectId || ''
                     ,maxnamelength: 3
                     ,parentUrl: props.parentUrl || '/maint'
                     ,handleChange: props.handleChange || function() {}
                     ,handleReset: props.handleReset || function() {}
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveMilestone = this.saveMilestone.bind(this);

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
            let mile = prevState.milestone || {};
            mile[name] = value;
            return {milestone: mile}
        });
        this.state.handleChange(event); //lift up
    }

    handleReset(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        this.setState(prevState=>{
            return {milestone: {}}
        });
        this.state.handleReset(event); //lift up
    }

    saveMilestone(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target;
        const args = {
            projectId: this.state.projectId,
            data: this.state.milestone
        };
        console.log("MilestoneEditForm: save milestone projectId=",this.state.projectId);
        console.log("MilestoneEditForm: save milestone ...",this.state.milestone);
        upsertMilestone.call(
            args
        , (error, response) => {
            if (error) {
                console.error(error);
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Milestone updated successfully',appConfig.alerts);
            }
        });
        this.handleReset(event);
    }

    render() {

        if(this.state.milestone === null || undefined === this.state.milestone) {
            return (
                <Redirect to={this.state.parentUrl} />
            )
        }

        let expStartStr = this.state.milestone.expectedStart ? Helpers.getDateString(this.state.milestone.expectedStart) : '';
        let actStartStr = this.state.milestone.actualStart ? Helpers.getDateString(this.state.milestone.actualStart) : '';
        return (
            <div id="edit-milestone-container" className="edit-milestone">
                <form className="edit-milestone-form" onSubmit={this.saveMilestone} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Edit Milestone</legend>
                        <label>
                            Name:&nbsp;
                        <input name="name"
                            type="text"
                            maxLength ={this.state.maxlength}
                            size={this.state.maxnamelength}
                            readOnly
                            onChange = {this.handleChange}
                            value={this.state.milestone.name}
                            />
                            </label>
                        <label>
                            Description:&nbsp;
                        <input name="desc"
                            type="textarea"
                            cols="50"
                            rows="3"
                            onChange = {this.handleChange}
                            value={this.state.milestone.desc}
                            />
                        </label>
                        <br/>
                        <label>
                            Expected Start:
                        <input name="expectedStart"
                            type="date"
                            onChange = {this.handleChange}
                            value={expStartStr}
                            />
                        </label>
                        <label>
                            Actual Start:&nbsp;
                        <input name="actualStart"
                            type="date"
                            onChange = {this.handleChange}
                            value={actStartStr}
                            />
                        </label>
                        <br/>
                        <input type="submit" name="SaveMilestone" value="Save"/>&nbsp;<input type="reset" name="Cancel" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}
