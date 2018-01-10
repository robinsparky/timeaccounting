import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


//WorkRecords
export const WorkRecords = new Mongo.Collection("workrecords");
WorkRecordSchema = new SimpleSchema({
    taskId: { type: String, label: 'Task Id' }, //FK
    when: { type: Date, defaultValue: new Date(), label: 'Effort Date' },
    effort: { type: Number, decimal: true, defaultValue: 0.0, label: 'Effort' }, //hours
    comment: { type: String, label: 'Comment', optional: true },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: { type: Date, label: 'Created At' },
    lastModified: { type: Date, optional: true, label: 'Last Modified At' }
});
WorkRecords.attachSchema(WorkRecordSchema);

//Tasks
export const Tasks = new Mongo.Collection("tasks");
TaskSchema = new SimpleSchema({
    projectId: { type: String, label: 'Project Identifier' }, //project FK
    milename: { type: String, label: 'Milestone Name' }, //milestone FK (inside a project)
    name: { type: String, label: 'Task Name' },
    expectedEffort: { type: Number, defaultValue: 0.0, decimal: true, label: 'Expected Effort' },
    actualEffort: { type: Number, optional: true, decimal: true, defaultValue: 0.0, label: 'Actual Effort' },
    expectedStart: { type: Date, label: 'Expected Start Date' },
    actualStart: { type: Date, optional: true, label: 'Actual Start Date' },
    isBilled: { type: Boolean, defaultValue: false, label: 'Is Billed?' },
    workrecords: { type: [WorkRecordSchema], optional: true, label: 'Work Records' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: { type: Date, label: 'Created At' },
    lastModified: { type: Date, optional: true, label: 'Last Modified At' }
});
Tasks.attachSchema(TaskSchema);


//Projects
MilestoneSchema = new SimpleSchema({
    name: { type: String, min: 2, max: 3, regEx: /^M[0-9]{1}$/, label: 'Milestone Name' },
    desc: { type: String, optional: true, label: 'Milestone Summary' },
    expectedStart: { type: Date, optional: true },
    expectedEffort: { type: Number, optional: true, decimal: true },
    actualStart: { type: Date, optional: true }
});
export const Projects = new Mongo.Collection("projects");
ProjectSchema = new SimpleSchema({
    clientId: { type: String, optional: false, label: 'Client Id' }, //client Id FK
    name: { type: String, optional: false, label: 'Project Name' },
    milestones: { type: [MilestoneSchema], optional: true, label: 'Milestones' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: { type: Date, label: 'Created At' },
    lastModified: { type: Date, optional: true, label: 'Last Modified At' }
});
Projects.attachSchema(ProjectSchema);

//Clients
export const Clients = new Mongo.Collection('clients');
ClientSchema = new SimpleSchema({
    name: { type: String, label: 'Client Name' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: { type: Date, label: 'Created At' },
    lastModified: { type: Date, optional: true, label: 'Last Modified At' }
});
Clients.attachSchema(ClientSchema);

import './User.js';
import './Client.js';
import './Project.js';
import './Milestone.js';
import './Task.js';
import './WorkRecord.js';