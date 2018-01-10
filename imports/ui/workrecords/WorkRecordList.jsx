import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Alert from 'react-s-alert';
import Config from '../../api/lib/config.js';
import {add} from '../../api/WorkRecords/methods.js';
import WorkRecordView from './WorkRecordView';
import WorkRecordAddForm from './WorkRecordAddForm';
import Timer from '../components/Timer';

export default class WorkRecordList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          ct: false,
          recordTime: false,
          viewOnly: props.viewOnly || false,
          parentUrl: props.parentUrl || '/maint',
      }

      //Capture time record
      this.handleCaptureTime = this.handleCaptureTime.bind(this);
      this.handleStopCapture = this.handleStopCapture.bind(this);

      //Timer
      this.handleTimer = this.handleTimer.bind(this);
      this.handleStopTimer = this.handleStopTimer.bind(this);
      this.handleCancelTimer = this.handleCancelTimer.bind(this);

      //Save work record
      this.saveWorkRecord = this.saveWorkRecord.bind(this);
  }

/*
Mounting
--------
These methods are called when an instance of a component is being created and inserted into the DOM:
    constructor()
    componentWillMount() --This is the only lifecycle hook called on server rendering. 
    render()
    componentDidMount() -- Initialization that requires DOM nodes should go here. 
                           If you need to load data from a remote endpoint, this is a good place to instantiate the network request. 
                           Setting state in this method will trigger a re-rendering.

Updating
--------
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate() --Use this as an opportunity to operate on the DOM when the component has been updated. 

UnMounting
----------
    componentWillUnMount() --Perform any necessary cleanup in this method, 
                            such as invalidating timers, canceling network requests,
                            or cleaning up any DOM elements that were created in componentDidMount

  
  componentDidMount() {
    console.log("WorkRecordList: componentDidMount");
  }

  componentWillUnMount() {
    console.log("WorkRecordList: componentWillUnMount");
  }

  componentDidUnMount() {
    console.log("WorkRecordList: componentDidUnMount");
  }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("WorkRecordList: shouldComponentUpdate...",nextProps,nextState);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        console.log("WorkRecordList: componentWillReceiveProps...",nextProps);
    }
    
    componentWillUpdate() {
        console.log("WorkRecordList: componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("WorkRecordList: componentDidUpdate");
    }
    */

/*
 * Toggle Capture Time Form
*/
    handleCaptureTime(event) {
        if('undefined' === typeof(event) || null === event) return;
        this.setState(prevState=>{
            return {ct: !prevState.ct}
        });
    }

    handleStopCapture(work){
        if('undefined' === typeof(work) || null === work) return;
        this.saveWorkRecord(work);
        this.setState(prevState=>{
            return {ct: false}
        });
    }
    
/*
 * Toggle the Timer
*/
    handleTimer(event) {
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        const target = event.target; 
        this.setState(prevState=>{
            const rt = prevState.recordTime;
            return {recordTime: !rt}
        });
    }

    handleCancelTimer(event){
        if('undefined' === typeof(event) || null === event) return;
        event.preventDefault();
        this.handleTimer(event);
    }

    handleStopTimer(work){
        if('undefined' === typeof(work) || null === work) return;
        this.saveWorkRecord(work);
        this.handleTimer(event);
    }

    saveWorkRecord(work) {
        work.taskId = this.props.taskId;
        const args = {
            data: work
        };

        add.call(
            args
        , (error, response) => {
            if (error) {
                Alert.error(error.message,Config.alerts);
            } else {
                Alert.success('WorkRecord added successfully',Config.alerts);
            }
        });
    }

  renderWorkRecords() {        
        return this.props.data.map(wr=>{
            return <WorkRecordView viewOnly={this.state.viewOnly} key={wr._id} parentUrl={this.state.parentUrl} workrecord={wr} />
        });
  }

  render() {
    if(this.props.loading) return(<table className="workrecords"><tbody><tr><td>Loading work records ...</td></tr></tbody></table>)

    return (
        <table className="workrecords">
            <caption>Work Records</caption>
            <thead>
                <tr><th>When</th><th>Effort</th><th>Comments</th><th>Operations</th></tr>
            </thead>
            <tbody>
            {this.state.ct ? <tr><td colSpan="4"><WorkRecordAddForm handleReset={this.handleCaptureTime} handleSave={this.handleStopCapture} taskId={this.props.taskId} parentUrl={this.state.parentUrl} /></td></tr> : null}
            {this.state.recordTime ? <tr><td colSpan="4"><Timer handleStop={this.handleStopTimer} handleCancel={this.handleCancelTimer}/></td></tr> : null}
            {!(this.state.ct || this.state.recordTime) ? <tr><td></td><td></td><td></td><td><button id="add-workrecord-link" className="addWorkRecordLink addNewLink" onClick={this.handleCaptureTime}>Capture Effort</button>
                          <button className="recordTimeLink addNewLink" onClick={this.handleTimer}>Timer</button>
                          </td></tr> : null}
            </tbody>
            {this.renderWorkRecords()}
        </table>
    );
  }
}

WorkRecordList.displayName = 'WorkRecordList'

