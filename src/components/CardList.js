import { useEffect, useState } from "react";
import Card from "./Card";
import './css/CardList.css';
import { fetchProducts } from "../rtk/slices/products-slice";
import { useDispatch, useSelector } from "react-redux";

function CardList() {
    const api_url = 'https://fakestoreapi.com/products';
    // const [cards, setCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const cards = useSelector((state)=>state.products);

    useEffect(() => {
        getAllCategories()
        getProducts()
    }, [])

    const readCat = (list) => {
        setCategories(list)
    }

    // const getProductsInCategory = (catName) => {
    //     console.log(catName);
    //     fetch(`${api_url}/category/${catName}`)
    //         .then(res => res.json())
    //         .then(list => setCards(list))
    // }

    const getProducts = () => {
        dispatch(fetchProducts())
    }

    const getAllCategories = () => {
        fetch(`${api_url}/categories`)
            .then(res => res.json())
            .then(list => readCat(list))
    }

    const cardsmap = cards.map((card) => {
        return (
            <div className="col-3" key={card.id}>
                <Card product={card} />
            </div>
        )
    })

    // const categoriesmap = categories.map((category) => {
    //     return (
    //         <button className="filter-btn" key={category} onClick={() => { getProductsInCategory(category) }}>{category}</button>
    //     )
    // })

    return (
        <div className="card-list">
            {cards.length === 0 ? <h1>loading...</h1> : null}
            <div className="container">
                <div className="filter-btns">
                    <button className="filter-btn" onClick={() => { getProducts() }}>All</button>
                    {/* {categoriesmap} */}
                </div>
                <div className="row">
                    {cardsmap}
                </div>
            </div>
        </div>
    )
}

export default CardList;