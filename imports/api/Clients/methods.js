import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { User } from '../User.js';
import Clients from './Clients.js';

import Projects from '../Projects/Projects.js';
import Tasks from '../Tasks/Tasks.js';
import WorkRecords from '../WorkRecords/WorkRecords.js';

export const add = new ValidatedMethod({
    // register the name
    name: 'Client.add',

    validate(args) {
        args.data.user = args.data.user || User.id();
        Schemas.ClientSchema.clean(args.data, { removeEmptyStrings: true });
        var schemaContext = Schemas.ClientSchema.namedContext("clientEditReactForm");
        schemaContext.validate(args.data);
        console.log("validation succeeded");
    },

    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        console.log("%s run: args - %s", this.name, args);
        return Clients.insert(args.data);
    }
});

export const update = new ValidatedMethod({
    // register the name
    name: 'Client.update',

    validate(args) {
        args.data.user = args.data.user || User.id();
        Schemas.ClientSchema.clean(args.data, { removeEmptyStrings: true });
        var schemaContext = Schemas.ClientSchema.namedContext("clientEditReactForm");
        schemaContext.validate(args.data);
        console.log("validation succeeded");
    },

    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        console.log("%s run: args - %s", this.name, args);
        return Clients.update(args.clientId, { $set: args.data });
    }
});

export const remove = new ValidatedMethod({
    // register the name
    name: 'Client.remove',

    validate: new SimpleSchema({
        clientId: { type: String }
    }).validator(),


    // the actual database updating part
    // validate has already been run at this point
    run(args) {
        const clientId = args.clientId;
        console.log("%s.run: args", this.name, clientId);
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not authorized to remove projects');
        }
        Projects.find({ $or: [{ 'clientId': clientId }, { 'c_Id': clientId }] }).forEach(project => {
            Tasks.find({ 'projectId': project._id }).forEach(task => {
                let w = WorkRecords.remove({ 'taskId': task._id });
                console.log(`Removed ${w} work records for task='${task._id}'`);
            });
            let t = Tasks.remove({ 'projectId': project._id });
            console.log(`Removed ${t} tasks for project='${project.name}'`);
        });

        let p = Projects.remove({ 'clientId': clientId });
        console.log(`Removed ${p} projects for client: '${clientId}'`);

        console.log(`Removed client '${clientId}'`);
        return Clients.remove(clientId);
    }
});

/***************************Remove eventually ***************************************************/
export class Client {
    constructor(props) {
        this._id = props._id || '';
        this.name = props.name || '';
        this.projects = [];
    }

    getName() {
        return this.name;
    }

    setName(desc) {
        this.name = desc;
    }

    addProject(proj) {
        if (proj instanceof Project) {
            this.projects.push(proj);
        }
    }

    removeProject(projId) {
        if (typeof projId === 'string') {
            for (var i = 0; i < this.projects.length; i++) {
                if (this.projects[i]._id === trId) this.projects.splice(i, 1);
            }
        }
    }
}