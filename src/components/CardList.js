import { useEffect } from "react";
import Card from "./Card";
import './css/CardList.css';
import { fetchProducts } from "../rtk/slices/products-slice";
import { fetchCategory } from "../rtk/slices/filter-slice"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CardList() {
    const params = useParams();
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.products);
    const filter = useSelector((state) => state.filter)

    useEffect(() => {
        getProducts()
        if (params.categoryId) {
            getCategory(params.categoryId)
        }
    }, [params.categoryId])

    const getCategory = (catId) => {
        dispatch(fetchCategory(catId))
    }

    const getProducts = () => {
        dispatch(fetchProducts())
    }

    const cardsmap = cards.map((card) => {
        let ret = null
        if (params.categoryId && card.category === filter._id) {
            ret =
                <div className="col-3" key={card._id}>
                    <Card product={card} />
                </div>

        } else if (!params.categoryId) {
            ret =
                <div className="col-3" key={card._id}>
                    <Card product={card} />
                </div>
        }
        return ret
    })

    return (
        <div className="card-list">
            {cards.length === 0 ? <h1>loading...</h1> : null}
            <div className="container">
                <div className="row">
                    {cardsmap}
                </div>
            </div>
        </div>
    )
}

export default CardList;