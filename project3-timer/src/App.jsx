import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

class TimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = { timeLeft: null, timer: null }
        this.startTimer = this.startTimer.bind(this)
    }
    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            console.log('2: Inside of setInterval')
            var timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) clearInterval(timer)
            this.setState({ timeLeft: timeLeft })
        }, 1000)
        console.log('1: After setInterval')
        return this.setState({ timeLeft: timeLeft, timer: timer })
    }
    render() {
        return (
            <div className="row-fluid">
                <h2>Timer</h2>
                <div className="btn-group" role="group" >
                    <Button time="5" startTimer={this.startTimer} />
                    <Button time="10" startTimer={this.startTimer} />
                    <Button time="15" startTimer={this.startTimer} />
                </div>
                <Timer timeLeft={this.state.timeLeft} />
                <audio id="end-of-time" src="//ssl.gstatic.com/dictionary/static/sounds/de/0/finish.mp3" preload="auto"></audio>
            </div>
        )
    }
}

class Timer extends React.Component {
    render() {
        if (this.props.timeLeft == 0) {
            document.getElementById('end-of-time').play()
        }
        if (this.props.timeLeft == null || this.props.timeLeft == 0)
            return <div />
        return <h1>Time left: {this.props.timeLeft}</h1>
    }
}
class Button extends React.Component {
    startTimer(event) {
        return this.props.startTimer(this.props.time)
    }
    render() {
        return <button type="button" className='btndefault btn' onClick={this.startTimer.bind(this)}>
            {this.props.time} seconds
</button>
    }
}






class App extends Component {
    render() {
        return <TimerWrapper />
    }
}
export default App;
