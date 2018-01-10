import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { createCollection } from '../lib/collection-helpers.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { User } from '../User.js';
import WorkRecords from './WorkRecords.js';
import Tasks from '../Tasks/Tasks.js';
import Recalculate from '../lib/recalculate.js'

export const add = new ValidatedMethod({
    name: 'addWorkRecord',

    validate(args) {
        console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.WorkRecordSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.WorkRecordSchema.namedContext("workRecordEditReactForm");
        schemaContext.validate(args.data);
    },

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('NotAuthorized', 'Not authorized to insert WorkRecords');
        }
        if(args.data.when > Date.now()) {
            throw new Meteor.Error('date_cannot_be_in_future','Cannot add work hours in the future.')
        }
        const res =  WorkRecords.insert(args.data);
        const task = Tasks.findOne({'_id': args.data.taskId});
        Recalculate(task.projectId);
        return res;
    }
});

//Not Used
export const update = new ValidatedMethod({
    name: 'updateWorkRecord',

    validate(args) {
        console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.WorkRecordSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.WorkRecordSchema.namedContext("workRecordEditReactForm");
        schemaContext.validate(args.data);
    },

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('NotAuthorized', 'Not authorized to upsert WorkRecords');
        }
        return WorkRecords.update(args.taskId, { $set: args.data });
    }
});

export const remove = new ValidatedMethod({
    name: 'deleteWorkRecord',

    validate: new SimpleSchema({
        workId: { type: String }
    }).validator(),

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('NotAuthorized', 'Not authorized to delete Work Records');
        }
        WorkRecords.remove({ '_id': args.workId });
    }
});

export const deleteTaskWorkRecords = new ValidatedMethod({
    name: 'deleteTaskWorkRecords',

    validate: new SimpleSchema({
        taskId: { type: String }
    }).validator(),

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to delete Work Records');
        }

        WorkRecords.remove({ 'taskId': args.taskId });
    }
});