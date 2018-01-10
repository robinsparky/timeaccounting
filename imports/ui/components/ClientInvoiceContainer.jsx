import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// Client-side only collection
const ClientInvoiceCollection = new Mongo.Collection("clientInvoiceCollection");

import ClientInvoiceReport from './ClientInvoiceReport.jsx';

export default ClientInvoiceContainer = withTracker(({clientId}) =>{
    const effortHandle = Meteor.subscribe("client.Invoice",clientId);
    const loading = !effortHandle.ready();
    return {
        loading,
        clientId: clientId,
        data: ClientInvoiceCollection.find(clientId).fetch(),
    };
})(ClientInvoiceReport);
