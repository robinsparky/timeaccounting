import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import Alert from 'react-s-alert';
// import appConfig from '../../api/lib/config.js';

export default class Select extends TrackerReact(React.Component){
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Item"
        }
        this.onSelect = props.onSelect || function() {}
        this.onChange = this.onChange.bind(this);
    }

    getOptions() {
        const data = this.props.data || [];
        if(data.length < 1) {
            console.error("Select.getOptions: No data!");
        }
        return data.map((item,index)=>{
            return <option value={item.value} key={index}>{item.name}</option>
        });
    }

    onChange(event) {
        if(typeof event === 'undefined' || null === event) return;
        event.preventDefault();
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.onSelect(value);
        //Alert.info(`${name}:${value}`,appConfig.alerts);
    }

    render() {
        return (
            <div>
                <span>Choose {this.state.title}:</span>
                <select name={this.state.title} onChange={this.onChange}>
                    {this.getOptions()}
                </select>
            </div>
        );
    }
}