import React from 'react';

import Config from '../../api/lib/config.js';
import helpers from '../../api/lib/helpers.js';

export default class ClientInvoiceProject extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getData() {
        return this.props.data || {};
    }

    render() {
        let project = this.getData();
        let charge = project.totalUnBilled * Config.hourlyRate;
        return(
            <h3 className="invoiceProject">
                <span>'{project.projectName}':</span>
                &nbsp;<span>Project Effort:&nbsp;{project.totalEffort}</span>
                &nbsp;<span>Billed:&nbsp;{project.totalBilled}</span>
                &nbsp;<span>UnBilled:&nbsp;{project.totalUnBilled}</span> 
                &nbsp;<span>Outstanding:&nbsp;{charge.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> 
            </h3>
        )
        
    }
}