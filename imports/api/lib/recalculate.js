import Projects from '../Projects/Projects.js';
import Tasks from '../Tasks/Tasks.js';
import WorkRecords from '../WorkRecords/WorkRecords.js';

import appConfig from './config.js';
import { User } from '../User.js';

/*
 * Recalculate for a given project: 
 * 1. Each Milestone's expected end date by adding the total expected effort (converted to days) 
 *    from each Task belonging to that Milestone to the Milestone's expected start.
 * 2. Each Task's actual effort as the sum of all Work Record's efforts for that Task.
*/
export default Recalculate = (projectId) => {
     
    let project = Projects.findOne({'_id': projectId});
    let result = 0;
    if(project) {   
        let numTasks = 0;
        let numWorkRecs = 0;
        let stones = project.milestones || [];
        for (let i = 0; stones && i < stones.length; i++) {
            let actMileEffort = 0.0;
            let expMileEffort = 0.0;
            Tasks.find({ 'projectId': projectId, 'milename': stones[i].name}).forEach(task => {
                let wr = WorkRecords.find({'taskId': task._id}).fetch();
                //console.log("Recalculate: project '%s'/'%s' -> found %d work records for task '%s'",project.name,stones[i].name,wr.length,task.name);
                numWorkRecs += wr.length;
                let actEffort = wr.length > 0 ? wr.map(w => w.effort).reduce((sum,effort)=>{return sum + effort;}) : 0.0;
                actMileEffort += actEffort;
                expMileEffort += (task.expectedEffort || 0.0);
                //console.log("Recalculate: project '%s'/'%s' -> updating actual effort from %d to %d",project.name,stones[i].name,task.actualEffort, actEffort);
                numTasks += (actEffort !== task.actualEffort ? Tasks.update(task._id, { $set: {'actualEffort': actEffort}}) : 0);
            });

            let expectedEffortDays = Math.ceil((expMileEffort / appConfig.hoursPerDay));
            //console.log(`Recalculate: project '${project.name}'/'${stones[i].name}': total Expected Effort is ${expMileEffort} hours or ${expectedEffortDays} days`);
            stones[i].expectedEnd = new Date(stones[i].expectedStart.valueOf());
            stones[i].expectedEnd = stones[i].expectedEnd.setDate(stones[i].expectedEnd.getDate() + expectedEffortDays);
            }   

        result = numTasks;
        Projects.update({ '_id': projectId }, { $set: { milestones: stones} });
        console.log(`Recalculate: updated '${project.name}' (project Id='${projectId}'): ${stones.length} milestones, updated ${numTasks} tasks with ${numWorkRecs} work records.`);
    }

}