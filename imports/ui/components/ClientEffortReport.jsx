import React from 'react';
import PropTypes from 'prop-types'; // ES6

export default class ClientEffortReport extends React.Component {

    //TODO: Why is "report" an array?
    static propTypes = {
        report: PropTypes.array.isRequired
    }
    
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    getData() {
            return this.props.report[0];
    }

    renderCaption() {
        let report = this.getData();
        return <caption key={report.clientId}>{report.clientName}</caption>
    }

    renderResults() {
        let key = 0;
        let report = this.getData();
        return report.projects.map(project => {
            let outlook = project.totalExpected - project.totalActual;
            return <tr key={key++} className="projectEffortLine"><td>{project.projectName}</td>
                                                                <td>{project.totalExpected.toFixed(1)}</td>
                                                                <td>{project.totalActual.toFixed(1)}</td>
                                                                <td>{outlook.toFixed(1)}</td>
                                                                <td>{project.totalBilled.toFixed(1)}</td>
                                                                <td>{project.totalUnBilled.toFixed(1)}</td></tr>
        });
    }

    render() {
        if(this.props.loading) {
            return (<div className="loading">Loading ...</div>)
        }
        return (
            <table  className="projectEffort">
                {this.renderCaption()}
                <thead>
                    <tr className="projecdtEffortHead"><th>Project Name</th><th>Total Expected</th><th>Total Actual</th><th>OutLook</th><th>Total Billed</th><th>Total UnBilled</th></tr>
                </thead>
                <tbody>
                    {this.renderResults()} 
                </tbody>
            </table>
        )
    }
}