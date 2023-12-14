import React from "react";

class Time extends React.Component {
    constructor(props){
        super(props);
        this.state = {time: new Date()};
    }

    render(){
        return(
            <div className="Time">
                <h6>{this.state.time.toLocaleTimeString()} {this.state.time.toLocaleDateString()}</h6>
            </div>
        )
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }
}

export default Time;