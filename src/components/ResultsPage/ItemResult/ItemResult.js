import React from 'react';
import freeShippingIcon from '../../../assets/ic_shipping.png';
import freeShippingIcon2x from '../../../assets/ic_shipping@2x.png';
import './ItemResult.scss';
import { useHistory } from 'react-router-dom';


export const ItemResult = (props) => {
    const data = props.data;
    const history = useHistory();

    const handleClick = () => {
        history.push(`/items/${data.id}`);
    }

    return (
        <div className="item-result" onClick={() => handleClick()}>
            <img className="product-pic" src={data.picture} alt="product_pic"/>
            <div className="product-info">
                <div className="price-and-shipping">
                    <span className="price">{`$ ${data.price.amount}`}</span>
                    {data.free_shipping
                        ? <img className="free-shipping" src={freeShippingIcon} srcSet={`${freeShippingIcon} 1x, ${freeShippingIcon2x} 2x`} alt="free_shipping"/>
                        : null}
                </div>
                <span className="product-title">{data.title}</span>
            </div>
            <span className="product-address-state">{data.state_name}</span>
        </div>
    );
}