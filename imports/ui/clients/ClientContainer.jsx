import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Clients from '../../api/Clients/Clients.js';
import ClientList from './ClientList.jsx';

export default ClientViewContainer = withTracker(({}) =>{
    const clientsHandle = Meteor.subscribe('Clients');
    const loading = !clientsHandle.ready();
    const clients = Clients.find().count();
    const exists = !loading && clients > 0;
    const viewOnly = true;
    return {
        viewOnly,
        loading,
        data: exists ? Clients.find().fetch() : [],
    }
})(ClientList);