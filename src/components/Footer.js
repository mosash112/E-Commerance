import React from "react";
import Credits from "./Credits";
import './css/Footer.css'

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
            <div className="Footer">
                <Credits name={this.state}></Credits>
            </div>
        )
    }
}

export default Footer;