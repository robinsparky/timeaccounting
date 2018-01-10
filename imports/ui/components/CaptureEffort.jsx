import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CaptureEffort extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {parentUrl: props.mode === "crud" ? "/maint" : "/ops"
                    ,viewOnly: props.viewOnly || false
                    ,projectId: props.projectId || ''
                    ,subscription: {
                        projHandle: Meteor.subscribe('project.Tasks', props.projectId)
                    }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("CLICK!");
    }
    
    render() {
        return (
             <div>
                 <form id="captureEffortForm">
                     <input type="number" name="effort" value="0" onClick={this.handleClick}/>
                     </form>
            </div>
        );
    }

}