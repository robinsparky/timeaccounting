import React, {Component} from 'react';

import Helpers from '../../api/lib/helpers.js'

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {elapsed: 0
                 ,elapsedAtPause: 0
                 ,start: (new Date()).getTime()
                 ,stopped: false
                 ,paused: false
                 ,milliSeconds: 1000
                 ,secondesPerMinute: 60
                 ,minutesPerHour: 60
                 ,handleStop: props.handleStop || function() {}
                 ,handleCancel: props.handleCancel || function() {}
    };
    
    this.messages = ['Elapsed','Paused','Stopped']
    this.stopTimer = this.stopTimer.bind(this);
    this.cancelTimer = this.cancelTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  stopTimer(event) {
    if(null === event || 'undefined' === typeof event) return;
    event.preventDefault();
     this.setState({stopped: true});
     let effort = Helpers.milliSeconds2Hours(this.state.elapsed);
     if(Number.isNaN(effort)) {
         console.error("Effort is not a number!");
         effort = 0.0;
     }
     let work = {'when': new Date(), 'effort': effort, 'comment': 'timer'};
     this.state.handleStop(work) //Lift up
  }

  cancelTimer(event){
    if(null === event || 'undefined' === typeof event) return;
    event.preventDefault();
     this.setState({stopped: true});
     this.state.handleCancel(event);
  }
  
  pauseTimer(event) {
    if(null === event || 'undefined' === typeof event) return;
    event.preventDefault();
    this.setState(prevState => {
        if(prevState.paused) {
          let reset = (new Date()).getTime() - prevState.elapsedAtPause;
            return {paused: false, start: reset}
        }
        else {
            return {paused: true, elapsedAtPause: prevState.elapsed};
        }
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
                    () => this.tick(),
                    this.state.milliSeconds);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
        this.setState(prevState=> {
      if(!prevState.paused) {
          let dur = (new Date()).getTime() - prevState.start;
            return {elapsed: dur}
        }
    });
  }
  

  render() {
      let display = Helpers.seconds2Time(this.state.elapsed/this.state.milliSeconds);
      if(this.state.stopped) {
        return null;
      }
      else {
        return (
        <div className="task-elapsedtime">
            {this.state.paused ? <h2>{this.messages[1]}&nbsp;{display}&nbsp;<button onClick={this.pauseTimer}>Restart</button>&nbsp;<button onClick={this.cancelTimer}>Cancel</button></h2> 
                               : <h2>{this.messages[0]}&nbsp;{display}&nbsp;<button onClick={this.pauseTimer}>Pause</button>&nbsp;<button onClick={this.stopTimer}>Stop</button>&nbsp;</h2>}
        </div>
        );
     }
  }
} 
