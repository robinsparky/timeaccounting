import React from 'react';

import helpers from '../../api/lib/helpers.js';
import LineItem from './ClientInvoiceLineItem.jsx';

export default class ClientInvoiceLineItems extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    getData() {
        return this.props.data || [];
    }

    renderItems() {
        let items = this.getData();
        return items.map((item,index)=>{
            return <LineItem key={index} task={item.Task} when={item.Date} effort={item.Effort} comments={item.Comments}/>
        });
    }

    render() {
            return (
                <table className="lineItems">
                    <thead>
                        <tr><th>When</th><th>Task</th><th>Comments</th><th>Effort</th></tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            )
        }
}