import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { User } from '../User.js';
import Tasks from './Tasks.js';
import WorkRecords from '../WorkRecords/WorkRecords.js';
import Recalculate from '../lib/recalculate.js';

export const add = new ValidatedMethod({
    name: 'insertTask',

    validate(args) {
        console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.TaskSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.TaskSchema.namedContext("taskEditReactForm");
        schemaContext.validate(args.data);
    },

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to add Tasks');
        }
        return Tasks.insert(args.data);
    }
});

export const update = new ValidatedMethod({
    name: 'updateTask',

    validate(args) {
        console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.TaskSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.TaskSchema.namedContext("taskEditReactForm");
        schemaContext.validate(args.data);
    },

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to update Tasks');
        }
        console.log("Tasks.%s: args:",this.name,args);
        console.log("Tasks.%s: finding work records for project id=%s",this.name,args.taskId);
        let wr = WorkRecords.find({'taskId': args.taskId}).fetch();
        console.log("Tasks.%s: number of work records=%d",this.name,wr.length);
        let actEffort = wr.length > 0 ? wr.map(w => w.effort).reduce((sum,effort)=>{return sum + effort;}) : 0.0;
        console.log("Tasks.%s: actual Effort=%d",this.name,actEffort);
        args.data.actualEffort = actEffort;
        return Tasks.update(args.taskId, { $set: args.data });
    }
});

export const remove = new ValidatedMethod({
    name: 'deleteTask',

    validate: new SimpleSchema({
        taskId: { type: String }
    }).validator(),

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to delete Tasks');
        }
        let w = WorkRecords.remove({ 'taskId': args.taskId});
        console.log(`Removed ${w} work records for task='${args.taskId}'`);
        Tasks.remove(args.taskId);
    }
});

export const deleteMilestoneTasks = new ValidatedMethod({
    name: 'deleteMilestoneTasks',

    validate: new SimpleSchema({
        projectId: { type: String },
        milename: { type: String }
    }).validator(),

    run(projectId, milename) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to delete Milestones');
        }
        Tasks.find({ 'projectId': projectId, 'milename': milename }).forEach(task => {
            let w = WorkRecords.remove({ 'taskId': task._id });
            console.log(`Removed ${w} work records for task='${task._id}'`);
        });
        let n = Tasks.remove({ 'projectId': projectId, 'milename': milename });
        console.log("deleteMilestoneTasks: deleted %d tasks for ProjectId '%s' and milestone '%s'", n, projectId, milename);
    }
});