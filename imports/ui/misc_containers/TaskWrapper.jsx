import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import TimeRecordAdd from '../components/TimeRecordForm';
import TimeRecordList from '../components/TimeRecordList';

export default class TaskWrapper extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div id="maintain-tasks-container" className="maintain-tasks left-side">
            <TimeRecordList />
            <TimeRecordAdd />
        </div>
    );
  }
}

