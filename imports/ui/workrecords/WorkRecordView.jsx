import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Redirect} from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Alert from 'react-s-alert';
import {remove} from '../../api/WorkRecords/methods.js';
import Helpers from '../../api/lib/helpers.js';
import Config from '../../api/lib/config.js';

export default class WorkRecordView extends Component {
    static propTypes= {
  workrecord: PropTypes.object
};

    constructor(props) {
        super(props);
        this.state = {parentUrl: props.parentUrl || "/maint"
        }

        this.handleReset = this.handleReset.bind(this);
        this.deleteWorkRecord = this.deleteWorkRecord.bind(this);
    }

    
    handleReset(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
    }

    deleteWorkRecord(event) {
        if(null === event || 'undefined' === typeof event) return;
        event.preventDefault();
        let txt = '';
        if (confirm("Do you really want to delete this work record?") == true) {
            txt = `Confirmed the deletion work record ='${this.props.workrecord._id}'.`;

        const args = {workId: this.props.workrecord._id}
        remove.call(args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,Config.alerts);
            } else {
                Alert.success('WorkRecord deleted successfully',Config.alerts);
            }
        });
        
        } else {
            txt = `Cancelled the deletion work record = '${this.props.workrecord._id}'.`;
        }
        console.log(txt);
        this.handleReset(event);
    }

    render() {
        if(this.props.loading) return(<h1>Loading Work Records ...</h1>)
        
            return (
        <tbody className="workrecord">
            <tr>
                <td>{Helpers.getDateString(this.props.workrecord.when)}</td>
                <td>{this.props.workrecord.effort}</td>
                <td>{this.props.workrecord.comment}</td>
                <td><button className="delete-btn deleteLink" onClick={this.deleteWorkRecord}>Delete</button></td>
            </tr>
        </tbody>
        )
    }
}

