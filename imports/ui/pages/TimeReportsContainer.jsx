import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Clients from '../../api/Clients/Clients.js'
import TimeReports from './TimeReports.jsx';

export default ClientEffortContainer = withTracker(() =>{
    const clientsHandle = Meteor.subscribe("Clients");
    const loading = !clientsHandle.ready();
    return {
        loading,
        clients: Clients.find().fetch() || [],
    }
})(TimeReports);