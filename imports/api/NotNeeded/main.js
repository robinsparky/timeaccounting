//import '../imports/startup/server/';
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';

//import { Clients, Projects, Milestones, Tasks, WorkRecords } from '../imports/api/api.js';

Meteor.publish("Clients", function() {
    const t = new Date().toISOString();
    console.log(`${t} Clients: finding all...`);
    return Clients.find();
});

Meteor.publish("client.Projects", function(clientId) {
    const t = new Date().toISOString();
    let mess = `${t} client.Projects: finding projects for client '${clientId}'`;
    console.log(mess);
    // let len = Projects.find({ user: this.userId, clientId: clientId }).fetch().length;
    // console.log(`client.Projects: clientId='${clientId}' found ${len} projects`);
    return Projects.find({ user: this.userId, clientId: clientId });
});

Meteor.publish("project", function(projectId) {
    const t = new Date().toISOString();
    let mess = `${t} project: finding project '${projectId}'`;
    console.log(mess);
    return Projects.find({ _id: projectId });
});

Meteor.publish("user.Tasks", function() {
    const t = new Date().toISOString();
    let mess = `${t} user.Tasks: finding tasks for '${this.userId}'`;
    console.log(mess);
    return Tasks.find({ user: this.userId });
});

Meteor.publish("milestone.Tasks", function(projectId, milename) {
    const t = new Date().toISOString();
    let mess = `${t} milestone.Tasks: finding tasks for projectID='${projectId}' and milename='${milename}'`;
    console.log(mess);
    return Tasks.find({ 'projectId': projectId, 'milename': milename });
});

Meteor.publish("task", function(taskId) {
    const t = new Date().toISOString();
    let mess = `${t} task: finding tasiID='${taskId}'`;
    console.log(mess);
    return Tasks.find({ _id: taskId });
});

Meteor.publish("task.WorkRecords", function(taskId) {
    const t = new Date().toISOString();
    let mess = `${t} task.WorkRecords: finding WorkRecords for taskID='${taskId}'`;
    console.log(mess);
    return WorkRecords.find({ taskId: taskId }, { sort: { when: -1 } });
});