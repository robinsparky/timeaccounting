import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6

import Helpers from '../../api/lib/helpers.js';
import Alert from 'react-s-alert';
import appConfig from '../../api/lib/config.js';
import { upsertMilestone } from '../../api/Projects/methods.js';

export default class MilestoneAddForm extends Component {

static propTypes = {
  milestone: PropTypes.object
};

    constructor(props) {
        super(props);
        this.state = {milestone: props.milestone || {}
                     ,projectId: props.projectId || ''
                     ,parentUrl: props.parentUrl || '/maint'
                     ,maxnamelength: 3
                     ,maxcols: 50
                     ,maxrows: 2
                     ,maxsize: 8
                     ,step: 0.2
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
        this.state.handleReset(event); //lift up
    }

    saveMilestone(event) {
        if(null === event || undefined === event) return;
        event.preventDefault();
        if(!this.state.projectId) {
            let mess = `Missing ProjectId:'${this.state.projectId}' when adding milestone: '${this.state.milestone.name}'`
            throw mess;
        }

        const args = {
            projectId: this.state.projectId,
            data: this.state.milestone
        };

        upsertMilestone.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,appConfig.alerts);
            } else {
                Alert.success('Milestone added successfully',appConfig.alerts);
            }
        });
        this.handleReset(event);
    }

    render() {
        return (
            <div id="add-milestone-container" className="add-milestone">
                <form className="add-milestone-form" onSubmit={this.saveMilestone} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Add Milestone</legend>
                        <label>
                            Description:
                        <textarea name="desc"
                            cols={this.state.maxcols}
                            rows={this.state.maxrows}
                            required
                            onChange = {this.handleChange}
                            value={this.state.milestone.desc}
                            />
                        </label>
                        <label>
                            Expected Start:
                        <input name="expectedStart"
                            type="date"
                            onChange = {this.handleChange}
                            value={this.state.milestone.expectedStart ? Helpers.getDateString(this.state.milestone.expectedStart) : ''}
                            />
                        </label>
                        <br />
                        <input type="submit" name="SaveMilestone" value="Save"/>&nbsp;<input type="reset" name="Cancel" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}