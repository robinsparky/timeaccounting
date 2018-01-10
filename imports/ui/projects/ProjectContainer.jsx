import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Projects from '../../api/Projects/Projects.js';
import ProjectList from './ProjectList.jsx';

export default ProjectContainer = withTracker(({id}) =>{
    const projectsHandle = Meteor.subscribe("client.Projects",id);
    const loading = !projectsHandle.ready();
    const projects = Projects.find({'clientId': id}).count();
    const exists = !loading && projects > 0;
    return {
        loading,
        clientId: id,
        data: Projects.find({'clientId': id}).fetch()
    }
})(ProjectList);