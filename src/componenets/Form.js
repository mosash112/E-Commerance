import React from "react";

class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            password:'',
            gender:''
        };
    }

    nameHandler = (value) => {
        this.setState({name: value})
    }

    passwordHandler = (value) => {
        this.setState({password: value})
    }

    genderHandler = (value) => {
        this.setState({gender: value})
    }

    render(){
        return(
            <form onSubmit={(e)=>{
                e.preventDefault();
                console.log("form submited");
                console.log(this.state);
            }}>
                <label>Name</label>
                <input type="text" placeholder="your name" onChange={(event)=>{this.nameHandler(event.target.value)}}></input>
                <label>Password</label>
                <input type="password" placeholder="your password" onChange={(event)=>{this.passwordHandler(event.target.value)}}></input>
                <label>Gender</label>
                <select onChange={(event)=>{this.genderHandler(event.target.value)}}>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Form;