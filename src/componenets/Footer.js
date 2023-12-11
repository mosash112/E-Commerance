import React from "react";
import Credits from "./Credits";
import Time from "./Time";

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "mostafa",
            lastName: "saleh"
        };
    }

    render(){
        return(
            <>
                <Credits name={this.state}></Credits>
                <Time></Time>
            </>
        )
    }
}

export default Footer;