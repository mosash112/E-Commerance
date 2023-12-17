import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function ProductDetails(){
    const params = useParams();
    const api_url = 'https://fakestoreapi.com/products';
    const [product, setProduct] = useState({})
    
    useEffect(()=>{
        fetch(`${api_url}/${params.productId}`)
        .then(res => res.json())
        .then(json => setProduct(json))
    }, [])

    return(
        <>
            <Card product={product} showButton={false}/>
        </>
    );
}

export default ProductDetails;