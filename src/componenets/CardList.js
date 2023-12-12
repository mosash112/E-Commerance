import React from "react";
import cardsData from "../cards-data";
import Card from "./Card";
import './CardList.css';

class CardList extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const cards = cardsData.map((card)=>{
            return(
                <Card product={card} key={card.id}/>
            )
        })

        return(
            <div className="card-list">
                <div className="row">
                    {cards}
                </div>
            </div>
        )
    }
}

export default CardList;