import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import WorkRecords from '../../api/WorkRecords/WorkRecords.js';
import WorkRecordList from './WorkRecordList.jsx';

export default TaskContainer = withTracker(({taskId}) =>{
    const workHandle = Meteor.subscribe("task.WorkRecords",taskId);
    const loading = !workHandle.ready();
    return {
        loading,
        taskId: taskId,
        data: WorkRecords.find({'taskId': taskId}).fetch()
    }
})(WorkRecordList);