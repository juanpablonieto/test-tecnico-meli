import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoint } from '../../constants/endpoint';
import './ItemDetail.scss';

export const ItemDetail = () => {
    const params = useParams();
    const [isSearching, setIsSearching] = useState(true);
    const [data, setData] = useState({});
    const id = params.id;
    
    useEffect(() => {
        async function fetchData() {
            try {
                setIsSearching(true);
                const response = await fetch(`${endpoint}/api/items/${id}`,
                    {
                        method: 'GET',
                        mode: 'cors'
                    });
                const data = await response.json();
                setData(data);
                console.log(data)
                setIsSearching(false);
            } catch (error) {
                console.error(error);
                setData({})
                setIsSearching(false);
            }
        }
        fetchData();
    }, [id])

    return (
        <>
            {isSearching
                ? <div>Cargando</div>
                : (
                    <div className="item-detail">
                        <div className="product-pic-and-description">
                            <img className="product-pic" width={680} src={data.item.picture} alt="product_pic" />
                            <div className="product-description">
                                <span className="description-title">Descripción del producto</span>
                                <span className="description-value">{data.item.description}</span>
                            </div>
                        </div>
                        <div className="product-detail">
                                <span className="product-condition">{`${data.item.condition} - ${data.item.sold_quantity} vendidos`}</span>
                                <span className="product-title">{data.item.title}</span>
                                <span className="product-price">{`$ ${data.item.price.amount}`}</span>
                                <button className="buy-button">Comprar</button>
                            </div>
                    </div>
                )} 
        </>
    )
}
