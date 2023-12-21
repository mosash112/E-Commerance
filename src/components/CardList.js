import React from "react";
import Card from "./Card";
import './css/CardList.css';

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            api_url: 'https://fakestoreapi.com/products',
            categories: []
        };
    }

    componentDidMount() {
        this.getAllCategories()
        this.getProducts()
    }

    readData = (json) => {
        this.setState({ cards: json })
    }

    readCat = (list) => {
        this.setState({ categories: list })
    }

    getProductsInCategory = (catName) => {
        console.log(catName);
        fetch(`${this.state.api_url}/category/${catName}`)
            .then(res => res.json())
            .then(list => this.readData(list))
    }

    getProducts = () => {
        fetch(this.state.api_url)
            .then(res => res.json())
            .then(json => this.readData(json))
    }

    getAllCategories = () => {
        fetch(`${this.state.api_url}/categories`)
            .then(res => res.json())
            .then(list => this.readCat(list))
    }

    render() {
        const cards = this.state.cards.map((card) => {
            return (
                <div className="col-3" key={card.id}>
                    <Card product={card} />
                </div>
            )
        })

        const categories = this.state.categories.map((category) => {
            return (
                <button className="filter-btn" key={category} onClick={() => { this.getProductsInCategory(category) }}>{category}</button>
            )
        })

        return (
            <div className="card-list">
                {cards.length === 0 ? <h1>loading...</h1> : null}
                <div className="container">
                    <div className="filter-btns">
                        <button className="filter-btn" onClick={() => { this.getProducts() }}>All</button>
                        {categories}
                    </div>
                    <div className="row">
                        {cards}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardList;