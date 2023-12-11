import React from "react";

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
            <h6>created by, {this.state.firstName} {this.state.lastName}</h6>
        )
    }
}

export default Credits;