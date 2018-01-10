import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// Client-side only collection
const ClientEffortCollection = new Mongo.Collection("clientEffortCollection");

import ClientEffortList from './ClientEffortList.jsx';

export default ClientEffortContainer = withTracker(({clients}) =>{
    const effortHandle = Meteor.subscribe("client.Effort",clients);
    const loading = !effortHandle.ready();
    const allReports = clients.map(clientId => {return ClientEffortCollection.find(clientId).fetch()})
    return {
        loading,
        clients: clients,
        reports: allReports
    };
})(ClientEffortList);
