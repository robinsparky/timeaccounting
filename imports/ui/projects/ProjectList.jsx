import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ProjectView from './ProjectView';
import ProjectAddForm from './ProjectAddForm';


export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        viewOnly: props.viewOnly || false,
        addMode: false,
        parentUrl: props.parentUrl || "/maint",
        }

    this.addProjectHandler = this.addProjectHandler.bind(this);
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

  
  componentDidMount() {
    console.log("ProjectList: componentDidMount");
  }

  componentWillUnMount() {
    console.log("ProjectList: componentWillUnMount");
      //this.state.subscription.projsHandle.stop();
  }

  componentDidUnMount() {
    console.log("ProjectList: componentDidUnMount");
  }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectList: shouldComponentUpdate...",nextProps,nextState);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        console.log("ProjectList: componentWillReceiveProps...",nextProps);
    }
    
    componentWillUpdate() {
        console.log("ProjectList: componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("ProjectList: componentDidUpdate");
    }
    */

  addProjectHandler() {
      if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: !addMode};
        });
  }

  handleAddCancel(event) {
      if(undefined === event || null === event) return;
        event.preventDefault();
        this.setState(prevState=>{
              let addMode = prevState.addMode;
              return {addMode: false};
        });
  }


  renderProjects() {
        return this.props.data.map(proj=>{
            let id=proj._id;
            return <ProjectView viewOnly={this.props.viewOnly} key={id} projectId={id} project={proj} />
    });
  }

  render() {
    if(this.props.loading) return (<h1>Loading...</h1>);

    return (
        <section className="projects">
            <span>Projects</span>
            <span>&nbsp;&rArr;&nbsp;</span>
            {this.state.addMode ? <ProjectAddForm handleReset = {this.handleAddCancel} clientId={this.props.clientId} />
                                    : <span><button id="add-project-link" className="addProjectLink addNewLink" href="#" onClick={this.addProjectHandler}>Add</button></span>}
            {this.renderProjects()}
        </section>
    );
  }
}

