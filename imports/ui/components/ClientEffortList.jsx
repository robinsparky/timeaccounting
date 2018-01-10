import React from 'react';
import ClientEffortReport from './ClientEffortReport';
import PropTypes from 'prop-types'; // ES6

export default class ClientEffortList extends React.Component {
    
    static propTypes = {
        reports: PropTypes.array.isRequired,
        clients: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            clients: props.clients || []
            }
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
    
  renderEffortReports() {
        return this.props.reports.map((report,index)=>{
            return <ClientEffortReport key={index} report={report} />
    });
  }

  render() {
    if(this.props.loading) return (<div className="loading">Loading...</div>);

    return (
        <section className="clientEffortReports">
            {this.renderEffortReports()}
        </section>
    );
  }
}

