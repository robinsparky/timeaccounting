import React from 'react';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import TaskView from './TaskView';
import TaskAddForm from './TaskAddForm';

export default class TaskList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          addMode: false,
          viewOnly: props.viewOnly || false
      }
      
      this.handleNewTask = this.handleNewTask.bind(this);
      this.handleAddCancel = this.handleAddCancel.bind(this);
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

  
  componentWillUnMount() {
    console.log("TaskList: componentWillUnMount");
      //this.state.subscription.milestoneTasksHandle.stop();
  }
    
  componentDidMount() {
    console.log("TaskList: componentDidMount");
  }

  componentDidUnMount() {
    console.log("TaskList: componentDidUnMount");
  }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectList: shouldComponentUpdate",nextProps,nextState);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        console.log("TaskList: componentWillReceiveProps",nextProps);
    }
    
    componentWillUpdate() {
        console.log("TaskList: componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("TaskList: componentDidUpdate");
    }
*/

  handleAddCancel(event) {
      if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: false};
        });
  }

  handleNewTask() {
        if(undefined === event || null === event) return;
        event.preventDefault();
        const target = event.target; 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: !addMode};
        });
  }
  

  renderTasks() {
        return this.props.data.map(task=>{
            return <TaskView viewOnly={this.state.viewOnly} key={task._id} task={task} />
        });
  }

  render() {
      if(this.props.loading) return(<table><tbody><tr><td>Loading tasks ...</td></tr></tbody></table>)

    return (
        <table className="tasks">
            <caption>Tasks</caption>
            <thead>
                <tr><th>Name</th><th>Expected Start</th><th>Expected Effort</th><th>Actual Start</th><th>Actual Effort</th><th>Outlook</th><th>Actual End</th><th>Billed Effort</th><th>Operations</th></tr>
            </thead>
            <tbody>
            {this.state.addMode ? <tr><td colSpan="6"><TaskAddForm handleReset = {this.handleAddCancel} projectId = {this.props.projectId} milename={this.props.milename}/></td></tr>
                                : <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><button id="add-task-link" className="addTaskLink addNewLink" onClick={this.handleNewTask}>Add</button></td></tr>}
            </tbody>
            {this.renderTasks()}
        </table>
    );
  }
}

