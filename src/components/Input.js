import React from "react";

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <>
                <label>{this.props.label}</label>
                <input type={this.props.type} placeholder={this.props.label}></input>
            </>
        )
    }    
}

export default Input;