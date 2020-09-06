import React from 'react';
import searchIcon from '../../assets/ic_Search@2x.png';
import './Loading.scss';

export const Loading = ({ text }) => {
    return (
        <div className="loading-container">
            <img className="search-icon" src={searchIcon}/>
            <div className="loading-text">{`Cargando ${text}`}</div>
        </div>
    )
}
