import React from "react";
import Card from "./Card";
import './CardList.css';

class CardList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards:[]
        };
    }

    componentDidMount(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.readData(json))
    }

    readData = (json)=>{
        this.setState({cards:json})
    }

    render(){
        const cards = this.state.cards.map((card)=>{
            return(
                <Card product={card} key={card.id}/>
            )
        })

        return(
            <div className="card-list">
                {cards.length == 0 ? <h1>loading...</h1> : null}
                <div className="row">
                    {cards}
                </div>
            </div>
        )
    }
}

export default CardList;