import Projects from '../Projects.js';

const ProjectPublicFields = {
    name: 1,
    desc: 1,
    clientId: 1,
    createdAt: 1,
    milestones: 1
}

const ProjectListFields = {
    name: 1
}

Meteor.publish("client.Projects", function(clientId) {
    const t = new Date().toISOString();
    let mess = `${t} client.Projects: finding projects for client '${clientId}'`;
    console.log(mess);
    return Projects.find({ 'clientId': clientId }, ProjectPublicFields);
});

Meteor.publish("project.get", function(projectId) {
    const t = new Date().toISOString();
    let mess = `${t} project: finding project '${projectId}'`;
    console.log(mess);
    return Projects.find({ _id: projectId }, ProjectPublicFields);
});