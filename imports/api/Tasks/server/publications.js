import Tasks from '../Tasks.js';

const TaskPublicFields = {
    projectId: 1,
    milename: 1,
    name: 1,
    expectedEffort: 1,
    actualEffort: 1,
    expectedStart: 1,
    actualStart: 1,
    isBilled: 1,
    workrecords: 1,
    user: 1,
    createdAt: 1,
    lastModified: 1
}

const TaskListFields = {
    projectId: 1,
    milename: 1,
    name: 1
}

Meteor.publish("user.Tasks", function() {
    const t = new Date().toISOString();
    let mess = `${t} user.Tasks: finding tasks for '${this.userId}'`;
    console.log(mess);
    return Tasks.find({ user: this.userId }, TaskListFields);
});

Meteor.publish("project.Tasks", function(projectId) {
    const t = new Date().toISOString();
    let mess = `${t} all.Tasks: finding all tasks`;
    console.log(mess);
    return Tasks.find({ 'projectId': projectId}, TaskListFields);
})

Meteor.publish("milestone.Tasks", function(projectId, milename) {
    const t = new Date().toISOString();
    let mess = `${t} milestone.Tasks: finding tasks for projectID='${projectId}' and milename='${milename}'`;
    console.log(mess);
    return Tasks.find({ 'projectId': projectId, 'milename': milename }, TaskListFields);
});

Meteor.publish("task", function(taskId) {
    const t = new Date().toISOString();
    let mess = `${t} task: finding tasiID='${taskId}'`;
    console.log(mess);
    return Tasks.find({ _id: taskId }, TaskPublicFields);
});