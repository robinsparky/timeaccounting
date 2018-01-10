import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';

import Helpers from '../../api/lib/helpers.js';

export default class WorkRecordAddForm extends Component {
static propTypes = {
  workrecord: PropTypes.object
};

    constructor(props) {
        super(props);
        this.state = {taskId: props.taskId || ''
                     ,workrecord: props.workrecord || {}
                     ,parentUrl: '/maint'
                     ,maxLength: 7
                     ,step: 0.5
                     ,handleChange: props.handleChange || function() {}
                     ,handleReset: props.handleReset || function() {}
                     ,handleSave: props.handleSave || function() {}
                     };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.saveWorkRecord = this.saveWorkRecord.bind(this);
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
            let wr = prevState.workrecord || {};
            wr[name] = value;
            return {workrecord: wr}
        });
        this.state.handleChange(event); //lift up
    }

    handleReset(event){
        if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState({workrecord: {}});
        this.state.handleReset(event); //lift up
    }

    saveWorkRecord(event) {
        if(undefined === event || null === event) return;
        event.preventDefault();
        let work = this.state.workrecord;
        work['taskId'] = this.props.taskId;
        this.state.handleSave(work); //delegate saving to lift up
    }
    
    render() {
        let whenStr = Helpers.getDateString(this.state.workrecord.when);
        return (
            <div id="new-workrecord-container" className="add-workrecord">
                <form className="new-workrecord-form" onSubmit={this.saveWorkRecord} onReset={this.handleReset}>
                    <fieldset>
                        <legend>Capture Effort</legend>
                        <label>
                            When:
                        <input
                            name="when"
                            type="date"
                            maxLength ="50"
                            size="25"
                            required
                            onChange = {this.handleChange}
                            value={whenStr}
                            />
                        </label>
                        <label>
                            Effort:
                        <input
                            name="effort"
                            type="number"
                            step = {this.state.step}
                            maxLength = {this.state.maxLength}
                            size = {this.state.maxLength}
                            required
                            onChange = {this.handleChange}
                            value={this.state.workrecord.effort ? this.state.workrecord.effort : 0.0}
                            />
                        </label>
                        <label>
                            Comment:
                            <input
                                name="comment"
                                type="text"
                                maxLength = "50"
                                size = "35"
                                onChange = {this.handleChange}
                                value={this.state.workrecord.comment ? this.state.workrecord.comment : ''}
                            />
                            </label>
                        <br/>
                        <input type="submit" name="AddWorkRecord" value="Save"/>&nbsp;<input type="reset" name="reset" value="Cancel"/>
                    </fieldset>
                </form>
           </div>
        )
    }
}