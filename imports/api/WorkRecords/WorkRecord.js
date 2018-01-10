export class WorkRecord {
    constructor(props) {
        this._id = props._id || '';
        this.taskId = props.t_id || '';
        this.effort = props.effort || 0.0; //always hours
        this.when = props.when || new Date();
        this.comment = props.comment || '';
    }

    geWhen() {
        return this.when;
    }

    setWhen(when) {
        if (when instanceof Date) {
            this.when = when;
        }
    }

    getEffort() {
        return this.effort;
    }

    setEffort(effort) {
        if (typeof effort === 'number') {
            this.effort = effort;
        }
    }

    getComment() {
        return this.comment;
    }

    setComment(c) {
        if (typeof c === "string") {
            this.comment = c;
        }
    }

}



// var options = {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit"
// };
// console.log("**********WorkRecords***************");
// WorkRecords.find().forEach(wr => {
//     let effortDate = typeof wr.when.toLocaleDateString === 'function' ? wr.when.toLocaleDateString("en-US") : wr.when;
//     console.log(`taskId='${wr.taskId}' when='${effortDate}' effort='${wr.effort}'`);
// });