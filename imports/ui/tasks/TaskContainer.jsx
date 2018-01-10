import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Tasks from '../../api/Tasks/Tasks.js';
import TaskList from './TaskList.jsx';

export default TaskContainer = withTracker(({projectId,milename}) =>{
    const tasksHandle = Meteor.subscribe("milestone.Tasks",projectId,milename);
    const loading = !tasksHandle.ready();
    return {
        loading,
        projectId: projectId,
        milename: milename,
        data: Tasks.find({'projectId': projectId, 'milename': milename }).fetch()
    }
})(TaskList);