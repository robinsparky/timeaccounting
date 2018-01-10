import Clients from '../../Clients/Clients.js'
import Projects from '../../Projects/Projects.js';
import Tasks from '../../Tasks/Tasks.js';
import WorkRecords from '../../WorkRecords/WorkRecords.js';

import Recalculate from '../../lib/recalculate.js';


Meteor.publish("client.Effort", function(clients) {
    //let clientId = args.clientId;
    if(!Array.isArray(clients)) {
        throw new Meteor.Error('clients_not_array','Arg is not an array');
    }
    const t = new Date().toISOString();
    let mess = `++++++++++${t} client.Effort: for ${clients.length} client(s)`;
    console.log(mess);
    console.log(clients);

    clients.forEach((clientId) => {

        console.log("Effort report for clientId:",clientId);

        let client = Clients.findOne({'_id': clientId});

        let report = { 'clientId': clientId,'clientName': client.name, 'projects': [] };

        //All a client's projects
        Projects.find({ $or: [{ 'clientId': clientId }, { 'c_Id': clientId }] }).forEach(project => {
            Recalculate(project._id);
            let totalProjectActual = 0.0;
            let totalProjectExpected = 0.0;
            let totalProjectBilled = 0.0;
            let totalProjectUnBilled = 0.0;
            Tasks.find({ 'projectId': project._id }).forEach(task => {
                let totalTaskExpected = 0.0;
                let totalTaskBilled = 0.0;
                let taskId = task._id;
                let taskActual = 0.0;
                WorkRecords.find({'taskId': taskId}).forEach(wr=>{
                    taskActual += wr.effort;
                }); //end work records            
                totalTaskBilled += task.billedEffort || 0.0;
                totalTaskExpected += task.expectedEffort;
                totalProjectExpected += totalTaskExpected;
                totalProjectActual += taskActual;
                totalProjectBilled += totalTaskBilled;
                totalProjectUnBilled += (taskActual - totalTaskBilled);
            }); //end tasks

            //totalProjectExpected += project.milestones.map(mile => mile.expectedEffort || 0.0).reduce((sum, effort) => {return sum + effort;});
            report.projects.push({ 'projectName': project.name, 'totalExpected': totalProjectExpected, 'totalActual': totalProjectActual, 'totalBilled': totalProjectBilled, 'totalUnBilled': totalProjectUnBilled })
        }); //end projects
        // We can add documents one at a time to the named client-side-only collection
        this.added('clientEffortCollection', clientId, report);
        //console.log("REPORT:", report);
    });

    this.ready();

    // We may respond to some 3rd party event and want to send notifications
    //Meteor.setTimeout(() => {
        // If we want to modify a document that we've already added
        //this.changed('clientEffort', 'clientEffort', {field: 'new-value'});

        // Or if we don't want the client to see it any more
        //this.removed('clientEffortCollection', clientId);
    //});

    // It's very important to clean up things in the subscription's onStop handler
    this.onStop(() => {
        // Perhaps kill the connection with the 3rd party server
    });
});


Meteor.publish("client.Invoice", function(clientId) {
    //let clientId = args.clientId;
    const t = new Date().toISOString();
    let mess = `++++++++++${t} client.Invoice: for clientId='${clientId}'`;
    console.log(mess);
    let client = Clients.findOne({'_id': clientId});

    if(!client) {
        throw Meteor.Error('invalid-client-id', "Invalid Client Id");
    }

    let invoice = { 'clientId': clientId,'clientName': client.name,'totalEffort': 0.0, 'billedEffort': 0.0};
    invoice.projects = [];

    let totalClientEffort = 0.0;
    let totalClientBilledEffort = 0.0;
    //All a client's projects
    Projects.find({ $or: [{ 'clientId': clientId }, { 'c_Id': clientId }] }).forEach(project => {
        Recalculate(project._id);
        let totalProjectActual = 0.0;
        let totalProjectExpected = 0.0;
        let totalProjectBilled = 0.0;
        let totalProjectUnBilled = 0.0;
        let lineItems = [];
        Tasks.find({ 'projectId': project._id }).forEach(task => {
            let totalTaskExpected = 0.0;
            let totalTaskBilled = 0.0;
            let taskId = task._id;
            let taskActual = 0.0;
            WorkRecords.find({'taskId': taskId}).forEach(wr=>{
                taskActual += wr.effort;
                lineItems.push({'Project':project.name,'Task': task.name, 'Date':wr.when, 'Effort': wr.effort, 'Comments': wr.comment});
            }); //end work records            
            totalTaskBilled += task.billedEffort || 0.0;
            totalTaskExpected += task.expectedEffort;
            totalProjectExpected += totalTaskExpected;
            totalProjectActual += taskActual;
            totalProjectBilled += totalTaskBilled;
            totalProjectUnBilled += (taskActual - totalTaskBilled);
        }); //end tasks
        lineItems = lineItems.sort((item1,item2) => {
            return item1.Date - item2.Date;
        });
        let projInvoice = {'projectName': project.name, 'totalEffort': totalProjectActual, 'totalBilled': totalProjectBilled, 'totalUnBilled': totalProjectUnBilled.toFixed(1)};
        projInvoice.lineItems = lineItems;
        invoice.projects.push(projInvoice);
        totalClientEffort += totalProjectActual;
        totalClientBilledEffort += totalProjectBilled;
    }); //end projects
    invoice.totalEffort = totalClientEffort;
    invoice.billedEffort = totalClientBilledEffort;
    //console.log("INVOICE:", invoice);
    
    // We can add documents one at a time to the named client-side-only collection
    this.added('clientInvoiceCollection', clientId, invoice);
    // We can call ready to indicate to the client that the initial document sent has been sent
    this.ready();

    // We may respond to some 3rd party event and want to send notifications
    //Meteor.setTimeout(() => {
        // If we want to modify a document that we've already added
        //this.changed('clientEffort', 'clientEffort', {field: 'new-value'});

        // Or if we don't want the client to see it any more
        //this.removed('clientEffortCollection', clientId);
    //});

    // It's very important to clean up things in the subscription's onStop handler
    this.onStop(() => {
        // Perhaps kill the connection with the 3rd party server
    });


});