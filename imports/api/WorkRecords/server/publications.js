import WorkRecords from '../WorkRecords.js';
import Tasks from '../../Tasks/Tasks.js';

const WorkRecordPublicFields = {
    taskId: 1, //FK
    when: 1,
    effort: 1, //hours
    comment: 1,
    user: 1,
    createdAt: 1,
    lastModified: 1
}

const WorkRecordListFields = {
    taskId: 1, //FK
    when: 1,
    effort: 1, //hours
    comment: 1,
}

Meteor.publish("task.WorkRecords", function(taskId) {
    const t = new Date().toISOString();
    let mess = `${t} task.WorkRecords: finding WorkRecords for taskID='${taskId}'`;
    console.log(mess);
    return WorkRecords.find({ 'taskId': taskId }, WorkRecordListFields);
});

Meteor.publish("project.WorkRecords", function(projectId) {
    const t = new Date().toISOString();
    let mess = `${t} all.WorkRecords: finding all WorkRecords for projectId=${projectId}`;
    console.log(mess);
    let wr = [];
    
    const project = Projects.findOne({ '_id': projectId });
        if (project) {
            Tasks.find({ 'projectId': project._Id }).forEach(task => {
                WorkRecords.find({'taskId': task._Id}, WorkRecordListFields).forEach(work=>{
                    wr.push(work);
                });
            });
        }
    return wr;
});

Meteor.publish("all.WorkRecords", function() {
    const t = new Date().toISOString();
    let mess = `${t} all.WorkRecords: finding all WorkRecords`;
    console.log(mess);
    return WorkRecords.find({}, WorkRecordListFields);
});