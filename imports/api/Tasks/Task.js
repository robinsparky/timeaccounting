import WorkRecord from './WorkRecord.js';

export default class Task {
    constructor(args) {
        let props = args || {};
        this._id = props._id || '';
        this.projectId = props.projectId || null;
        this.milename = props.milename || null;
        this.name = props.name || null;
        this.expectedEffort = props.expectedEffort || 0.0; //always hours
        this.actualEffort = props.expectedEffort || 0.0; //always hours
        this.expectedStart = props.expectedStart || ''
        this.actualStart = props.actualStart || ''
        this.actualEnd = props.actualEnd || ''
        this.isBilled = false;
        this.workrecords = [];
    }

    static getTemplate() {
        return { projectId: '', milename: '', expectedEffort: 0, actualEffort: 0, expectedStart: '', actualStart: '', actualEnd: '', isBilled: false, workrecords: [] }
    }

    getRaw() {
        t = {};
        Reflect.ownKeys(this).forEach(k => {
            Reflect.set(t, k, this.k);
        })
        return t;
    }

    getExpectedStartDate() {
        return this.actualStart;
    }

    setExpectedStartDate(when) {
        if (when instanceof Date) {
            this.start = when;
        }
    }

    getActualStartDate() {
        return this.actualStart;
    }

    setActualStartDate(when) {
        if (when instanceof Date) {
            this.start = when;
        }
    }

    getActualEndDate() {
        return this.end;
    }

    setActualndDate(when) {
        if (when instanceof Date) {
            this.end = when;
        }
    }

    getTaskName() {
        return this.name;
    }

    setTaskName(task) {
        if (typeof task === 'string') {
            this.name = task;
        }
    }

    getExpectedEffort() {
        return this.expectedEffort;
    }

    setExpectedEffort(effort) {
        if (typeof effort == 'number') {
            this.expectedEffort = effort;
        }
    }

    isBilled() {
        return this.billed;
    }

    toggleBilled() {
        this.billed = !this.billed;
    }

    addWorkRecord(work) {
        if (work instanceof WorkRecord) {
            this.workrecords.push(work);
        }
    }

    removeWorkRecord(workId) {
        for (var i = 0; i < this.workrecords.length; i++) {
            if (this.workrecords[i].id === workId) this.workrecords.splice(i, 1);
        }
    }
}