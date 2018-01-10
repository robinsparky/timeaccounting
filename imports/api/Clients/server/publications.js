import Clients from '../Clients.js';

const ClientPublicFields = {
    name: 1,
    createdAt: 1
}

const ClientListFields = {
    name: 1
}

Meteor.publish("Clients", function() {
    const t = new Date().toISOString();
    console.log(`${t} Clients: finding all...`);
    let num = Clients.find().count();
    console.log(`Found ${num} clients.`)
    return Clients.find();
});

Meteor.publish('Client.get', function(_id) {
    //console.log("publication match ", CustomerCompanies.find({_id: custId}).fetch());
    return Clients.find({
        _id
    }, {
        fields: ClientPublicFields
    });
});

Meteor.publish('Client.searchByName', function(searchTerm) {
    //console.log("CustomerCompanies.searchByName - "
    //     + searchTerm + " - ", CustomerCompanies.find({name: new RegExp(searchTerm)}).fetch());

    // the 'i' makes the search case insensitive
    return Clients.find({
        name: new RegExp(searchTerm, 'i')
    }, {
        fields: ClientPublicFields
    });
});