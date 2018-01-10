import React from 'react';
import {Route, Switch}  from 'react-router-dom';

import TrackerReact from 'meteor/ultimatejs:tracker-react'

import ProjectAddForm from '../components/ProjectAddForm';
import ProjectList from '../components/ProjectList';


export default class EditProjectsWrapper extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div id="maintain-projects-container" className="maintain-projects left-side">
            <ProjectList />
            <ProjectAddForm />
        </div>
    );
  }
}