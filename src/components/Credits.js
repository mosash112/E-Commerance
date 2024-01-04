import React from "react";
import Time from "./Time";
import './css/Footer.css'

class Credits extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: this.props.name.firstName,
            lastName: this.props.name.lastName
        };
    }

    render(){
        return(
            <div className="Credits">
                <h6>created by, {this.state.firstName} {this.state.lastName}</h6>
                <Time />
            </div>
        )
    }
}

export default Credits;