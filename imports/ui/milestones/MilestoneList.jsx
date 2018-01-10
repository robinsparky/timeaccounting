import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import MilestoneView from './MilestoneView';
import MilestoneAddForm from './MilestoneAddForm';

export default class MilestoneList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          parentUrl: '/maint',
          projectId: props.projectId || '',
          addMode: false,
          viewOnly: props.viewOnly || false
      }

      this.addMilestoneHandler = this.addMilestoneHandler.bind(this);
      this.handleAddCancel = this.handleAddCancel.bind(this);

  }

  addMilestoneHandler(event) {
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


  renderMilestones() {
        let milestones = this.props.milestones || [];
        return milestones.map(mile=>{
            let key = this.state.projectId +':'+ mile.name;
            return <MilestoneView viewOnly={this.state.viewOnly} projectId={this.state.projectId} key={key} loc={this.state.parentUrl} milestone={mile} />
        });
  }

  render() {
    return (
        <table id="milestone-container" className="milestones">
            <caption>Milestones</caption>
            <thead>
            <tr><th>Name</th><th>Description</th><th>Expected Start</th><th>Expected End</th><th>Operations</th></tr>
            </thead>
            <tbody>
                {this.state.addMode ? <tr><td colSpan="4"><MilestoneAddForm handleReset = {this.handleAddCancel} projectId = {this.state.projectId} /></td></tr>
                                    : <tr><td></td><td></td><td></td><td></td><td><button id="add-milestone-link" className="addMilestoneLink addNewLink" onClick={this.addMilestoneHandler}>Add</button></td></tr>}
            </tbody>
            {this.renderMilestones()}
        </table>
    );
  }
}

