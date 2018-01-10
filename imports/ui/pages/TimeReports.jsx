import React from 'react';

import Select from '../components/Select';
import ClientEffortContainer from '../components/ClientEffortContainer';
import ClientInvoiceContainer from '../components/ClientInvoiceContainer';

export default class TimeReports extends React.Component{
  
    constructor(props) {
      super(props);
      this.state = {
          selectedClients: [],
          selectedReport: null,
      }
      this.data=[];
      this.onSelectClient = this.onSelectClient.bind(this);
      this.onSelectReport = this.onSelectReport.bind(this);
  }
  
    componentWillReceiveProps(nextProps) {
        //console.log("TimeReports: componentWillReceiveProps...",nextProps);
        this.setState(prevState => {return {selectedClients: [], selectedReport: null}});
    }

    
    getClients() {
        let data = [];
        data.push({'name': '-', 'value': ''});
        this.props.clients.forEach(client=>{
            let o = {'name':client.name, 'value': client._id};
            data.push(o);
        });
        data.push({'name':'All', 'value':'all'});
        return data;
    }

        //Report names and id's
    getReports() {
        let data = [];
        data.push({'name': '-', 'value': ''});
        [{'name': 'Total Effort', '_id': 1},{'name': 'Invoice Template', '_id': 2}].forEach(rpt=>{
            let o = {'name':rpt.name, 'value': rpt._id};
            data.push(o);
        });
        return data;
    }

    onSelectClient(value) {
        //console.log("onSelectClient: %s",value);
        this.setState(prevState=> {
            if('all' === value) {
                return {selectedClients: this.props.clients.map(client=>{return client._id;})}
            }
            else {
                return {selectedClients: [value]};
            }
        });
    }
        
    onSelectReport(value) {
        this.setState(prevState=> {
            let rpt = parseInt(value);
            return {selectedReport: rpt};
        })
    } 

    render() {
            // console.log("TimeReports: render selectedClients.length=%d", this.state.selectedClients.length);
            // console.log("TimeReports: render selectedReport:", this.state.selectedReport);
            if(this.state.selectedClients.length === 0 || !this.state.selectedReport) {
                let clientData = this.getClients();
                if(clientData.length <= 2) {
                    return (<div className="loading">Loading ... </div>);
                }
                else {
                let reportData = this.getReports();
                    return (
                        <div id="select-client-container" className="reports clientSelect">
                            <Select title="Client" data={clientData} key={'clients'} onSelect={this.onSelectClient}/>
                            <Select title="Report" data={reportData} key={'reports'} onSelect={this.onSelectReport}/>
                        </div>
                    )
                }
            }

            switch(this.state.selectedReport){
                case 1:
                    return (<ClientEffortContainer clients={this.state.selectedClients}/>);
                break;
                case 2:
                    return (<ClientInvoiceContainer clientId={this.state.selectedClients[0]}/>);
                break;
                default:
                    return (<div>Invalid Report Selection</div>);
                break;
            }

        }
  }
