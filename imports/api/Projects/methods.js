import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { User } from '../User.js';

import Projects from './Projects.js';
import Tasks from '../Tasks/Tasks.js';
import WorkRecords from '../WorkRecords/WorkRecords.js';
import Recalculate from '../lib/recalculate.js';
import appConfig from '../lib/config.js';

export const recalculate = new ValidatedMethod({
    // register the name
    name: 'Project.recalculate',

    validate: new SimpleSchema({
        projectId: { type: String }
    }).validator(),

    run(args) {
        //console.log("%s run: args - %s", this.name, args);
        const projectId = args.projectId;
        if (!Meteor.userId()) {
            throw new Meteor.Error('not_authorized_recalculate','Not authorized to recalculate projects');
        }
        return Recalculate(projectId);
    }
});

export const add = new ValidatedMethod({
    // register the name
    name: 'Project.add',

    validate(args) {
        //console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.ProjectSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.ProjectSchema.namedContext("projectEditReactForm");
        schemaContext.validate(args.data);
        //console.log("%s validation succeeded:", this.name);
    },

    run(args) {
        //console.log("%s run: args - %s", this.name, args);
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to add projects');
        }
        return Projects.insert(args.data);
    }
});

export const update = new ValidatedMethod({
    // register the name
    name: 'Project.update',

    validate(args) {
        //console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.ProjectSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.ProjectSchema.namedContext("projectEditReactForm");
        schemaContext.validate(args.data);
        //console.log("%s validation succeeded", this.name);
    },

    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        //console.log("%s run: args - %s", this.name, args);
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to update projects');
        }
        return Projects.update(args.projectId, { $set: args.data });
    }
});

export const remove = new ValidatedMethod({
    // register the name
    name: 'Project.remove',

    validate: new SimpleSchema({
        projectId: { type: String }
    }).validator(),


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        //console.log("%s run: args", this.name, args);
        const projectId = args.projectId;
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to remove projects');
        }

        const project = Projects.findOne({ '_id': projectId });
        if (project) {
            //console.log(`Removing project '${projectId}'`);
            Tasks.find({ 'projectId': project._id }).forEach(task => {
                let w = WorkRecords.remove({ 'taskId': task._id });
                //console.log(`Removed ${w} work records for task='${task._Id}'`);
            });
            let t = Tasks.remove({ 'projectId': project._id });
            //console.log(`Removed ${t} tasks for project='${project.name}'`);
        }
        return Projects.remove(projectId);
    }
});

export const upsertMilestone = new ValidatedMethod({
    name: 'upsert.MileStone',

    validate(args) {
        //console.log("%s.validate(args) ", this.name, args);
        args.data.user = args.data.user || User.id();
        Schemas.MilestoneSchema.clean(args.data, { removeEmptyStrings: false });
        var schemaContext = Schemas.MilestoneSchema.namedContext("milestoneEditReactForm");
        schemaContext.validate(args.data);
       //console.log("%s validation succeeded", this.name);
    },

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("Not authorized to %s ", this.name);
        }
        // console.log("%s: projectId=%s", this.name, args.projectId);
        // console.log(args.data);

        let project = Projects.findOne({ '_id': args.projectId });
        if (!project) {
            throw new Meteor.Error(`${this.name} Error`, 'Project does not exist.', `${this.name}: project with id '${args.projectId}' does not exist.`);
        } else {
            console.log("%s: Project Name: %s", this.name, project.name);
        }

        let stones = project.milestones || [];
        let newMilestoneName = `M${stones.length}`;

        // if (!args.data.name || !/M[0-9]{1}/.test(args.data.name)) {
        //     args.data.name = newMilestoneName;
        // }
        // console.log("%s: newMilestoneName=%s", this.name, newMilestoneName);
        // console.log(stones.length < 1 ? `${this.name}: No milestones present` : stones);
                

        //Check to see if milestone exists
        let found = false;
        for (let i = 0; stones && i < stones.length && args.data.name; i++) {
            if (stones[i].name === args.data.name) {
                let tasks = Tasks.find({ 'projectId': project._id,'milename': args.data.name }).fetch();
                console.log("Tasks:",tasks);
                let totalTaskExpectedEffort = tasks.length > 0 ? tasks.map(task => task.expectedEffort || 0.0).reduce((sum,expEff) => {return sum + expEff;}) : 0.0;
                stones[i].desc = args.data.desc;
                stones[i].actualStart = args.data.actualStart;
                stones[i].expectedStart = args.data.expectedStart;
                let expectedEffortDays = Math.ceil((totalTaskExpectedEffort / appConfig.hoursPerDay));
                console.log(`${this.name}: total Task Expected Effort=${totalTaskExpectedEffort} hours = ${expectedEffortDays} days (using ${appConfig.hoursPerDay} hours per day)`);
                stones[i].expectedEnd = new Date(stones[i].expectedStart.valueOf());
                stones[i].expectedEnd = stones[i].expectedEnd.setDate(stones[i].expectedEnd.getDate() + expectedEffortDays);
                found = true;
            }
        }

        if (found) {
            Projects.update({ '_id': args.projectId }, { $set: { milestones: stones, lastModified: new Date() } });
            //console.log(`${this.name}: Updated '${args.data.name}' for project Id='${args.projectId}'.`);
        } else {
            args.data.name = newMilestoneName;
            args.data.expectedEnd = new Date(args.data.expectedStart.valueOf());
            Projects.update({ '_id': args.projectId }, { $push: { 'milestones': args.data, lastModified: new Date() } });
            //console.log(`${this.name}: Added '${args.data.name}' to project Id='${args.projectId}'`);
        }
    }
});

export const deleteMilestone = new ValidatedMethod({
    name: 'delete.Milestone',
    validate: new SimpleSchema({
        projectId: { type: String },
        milename: { type: String }
    }).validator(),

    run(args) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to delete Milestones');
        }

        let project = Projects.findOne({ "_id": args.projectId }, { _id: 0, name: 1, clientId: 1, milestones: 1 });
        // console.log("%s: milename=%s", this.name, args.milename);
        // console.log(project);

        for (let i = 0; project.milestones && i < project.milestones.length; i++) {
            if (args.milename === project.milestones[i].name) {
                //console.log("%s: removing milestone '%s'", this.name, args.milename);
                let removed = project.milestones.splice(i, 1);
                //console.log(removed);
            }
        }

        Tasks.find({ 'projectId': args.projectId, 'milename': args.milename }).forEach(task => {
            let w = WorkRecords.remove({ 'taskId': task._id });
            //console.log(`Removed ${w} work records for task='${task._Id}'`);
        });
        let numT = Tasks.remove({ 'projectId': args.projectId, 'milename': args.milename });
        //console.log(`Removed ${args.milename} milestone and its ${numT} tasks`);
        return Projects.update({ "_id": args.projectId }, { $set: { milestones: project.milestones } });
    }
});