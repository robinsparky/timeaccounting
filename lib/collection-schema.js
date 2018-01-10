import { User } from '../imports/api/User.js';

Schemas = {};

Schemas.ClientSchema = new SimpleSchema({
    name: { type: String, label: 'Client Name' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: {
        type: Date,
        label: 'Created At',
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    lastModified: {
        type: Date,
        optional: true,
        label: 'Last Modified At',
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});

Schemas.MilestoneSchema = new SimpleSchema({
    name: { type: String, min: 2, max: 3, regEx: /^M[0-9]{1}$/, label: 'Milestone Name' },
    desc: { type: String, optional: true, label: 'Milestone Summary' },
    expectedStart: { type: Date, defaultValue: Date.now() },
    expectedEnd: { type: Date, optional: true},
    actualStart: { type: Date, optional: true }
});

Schemas.ProjectSchema = new SimpleSchema({
    clientId: { type: String, optional: false, label: 'Client Id' }, //client Id FK
    name: { type: String, optional: false, label: 'Project Name' },
    milestones: { type: [Schemas.MilestoneSchema], optional: true, label: 'Milestones' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: {
        type: Date,
        label: 'Created At',
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    lastModified: {
        type: Date,
        optional: true,
        label: 'Last Modified At',
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});

Schemas.TaskSchema = new SimpleSchema({
    projectId: { type: String, label: 'Project Identifier' }, //project FK
    milename: { type: String, label: 'Milestone Name' }, //milestone FK (inside a project)
    name: { type: String, label: 'Task Name' },
    expectedStart: { type: Date, label: 'Expected Start Date' },
    expectedEffort: { type: Number, defaultValue: 0.0, decimal: true, label: 'Expected Effort' },
    actualStart: { type: Date, optional: true, label: 'Actual Start Date' },
    actualEffort: { type: Number, optional: true, decimal: true, defaultValue: 0.0, label: 'Actual Effort' },
    actualEnd: { type: Date, optional: true, label: 'Actual End Date' },
    billedEffort: { type: Number, optional: true, decimal: true, defaultValue: 0.0, label: 'Billed Effort' },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: {
        type: Date,
        label: 'Created At',
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    lastModified: {
        optional: true,
        type: Date,
        label: 'Last Modified At',
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});

Schemas.WorkRecordSchema = new SimpleSchema({
    taskId: { type: String, label: 'Task Id' }, //FK
    when: { type: Date, defaultValue: new Date(), label: 'Effort Date' },
    effort: { type: Number, decimal: true, defaultValue: 0.0, label: 'Effort' }, //hours
    comment: { type: String, label: 'Comment', optional: true },
    user: { type: String, label: 'ModifiedBy' },
    createdAt: {
        type: Date,
        label: 'Created At',
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    lastModified: {
        type: Date,
        optional: true,
        label: 'Last Modified At',
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});