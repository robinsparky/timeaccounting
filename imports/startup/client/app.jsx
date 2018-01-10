console.log("app in startup/client");
import { Meteor }          from 'meteor/meteor';
import React, {Component}  from 'react';
import ReactDOM, {render}  from 'react-dom';

import {BrowserRouter} from 'react-router-dom'; 
import {Route}         from 'react-router-dom';
import {Redirect}      from 'react-router-dom';
import {Switch}        from 'react-router-dom';

//import createBrowserHistory from 'history/createBrowserHistory'; //Does this work?


import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import Header          from '../../ui/components/Header.jsx';
import Home            from '../../ui/pages/Home.jsx';
import About           from '../../ui/pages/About.jsx';
import NotFound        from '../../ui/pages/NotFound.jsx';
import Maintenance     from '../../ui/pages/Maintenance.jsx';
import TimeReportsContainer  from '../../ui/pages/TimeReportsContainer.jsx';

const struct =
<BrowserRouter>
    <div>
            <Header />
                <Route>
                    <Switch>
                        <Route path="/about" component = {About} />
                        <Route path="/maint" component = {Maintenance} />
                        <Route path="/reports" component = {TimeReportsContainer} /> 
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Route>
                <Alert stack={{limit: 3}} />
            <div id="footer" className="footer">&copy; Copyright Grayware Consulting</div>
    </div>
</BrowserRouter>;

Meteor.startup(()=>{
    console.log("app.jsx: Meteor.startup %s",Meteor.release);
    ReactDOM.render(struct,document.getElementById('reactive-target'));
});
