import React from 'react';
import PropTypes from 'prop-types'; // ES6

import ClientInvoiceProject from './ClientInvoiceProject.jsx';
import ClientInvoiceLineItems from './ClientInvoiceLineItems.jsx';

export default class ClientInvoiceReport extends React.Component {
  
    static propTypes = {
        clientId: PropTypes.string.isRequired
    }
    
    constructor(props) {
      super(props);
      this.state = {
          clientId: props.clientId || ''
      }
    }

    getData() {
            return this.props.data;
    }

    renderInvoiceHeading() {
        let invoice = this.getData()[0];
        return <div className="invoiceReport">
                    <h1>Invoice Report</h1>
                    <h2 key={invoice.clientId}>{invoice.clientName} &nbsp;&nbsp;&nbsp;As Of: {helpers.getDateString()}</h2>
                    <h3>
                        <span>Total Effort: {invoice.totalEffort}</span>&nbsp;
                        <span>Total Billed: {invoice.billedEffort}</span>
                    </h3>
                </div>
    }

    renderProjects() {
        let invoice = this.getData()[0];
        let projects = invoice.projects;
        return projects.map((project,index) => {
            return  <div key={project.projectName} id={project.projectName} className="invoiceProjectWrapper">
                        <ClientInvoiceProject data = {project}/>  
                        <ClientInvoiceLineItems data={project.lineItems}/>
                    </div>
        });
    }

    render() {
        if(this.props.loading) {
            return (<div className="loading">Loading ...</div>)
        }

        return (
            <section  className="invoiceEffort">
                {this.renderInvoiceHeading()}
                {this.renderProjects()}
            </section>
        )
    }
}