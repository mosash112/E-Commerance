import React from "react";
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className="nav-bar">
                <img className="logo" src="https://img.freepik.com/premium-vector/white-square-box-top-view-concept_152104-242.jpg?size=626&ext=jpg"></img>
                <div className="nav-btns">
                    <button className="nav-btn">home</button>
                    <button className="nav-btn">about us</button>
                    <button className="nav-btn">our work</button>
                    <button className="nav-btn">contact us</button>
                </div>
            </div>
        )
    }
}

export default Navbar;