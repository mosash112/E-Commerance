import React from "react";
import Card from "./Card";
// import './CardList.css';

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
                    <Card product={card} showButton={true} />
                </div>
            )
        })

        const categories = this.state.categories.map((category) => {
            return (
                <button className="btn btn-info" key={category} onClick={() => { this.getProductsInCategory(category) }}>{category}</button>
            )
        })

        return (
            <div className="card-list">
                {cards.length === 0 ? <h1>loading...</h1> : null}
                <h2 className="text-center p-3">Our products</h2>
                <div className="container">
                    <button className="btn btn-info" onClick={() => { this.getProducts() }}>All</button>
                    {categories}
                    <div className="row">
                        {cards}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardList;