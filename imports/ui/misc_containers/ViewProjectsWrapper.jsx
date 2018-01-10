import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import ProjectList from '../components/ProjectList';

export default class ProjectsWrapper extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div id="view-projects-container" className="view-projects left-side">
            <h2>View Projects</h2>
            <ProjectList viewOnly/>
        </div>
    );
  }
}
