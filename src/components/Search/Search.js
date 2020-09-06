import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from "../../assets/ic_Search.png";
import searchIcon2x from "../../assets/ic_Search@2x.png";
import logoML from "../../assets/Logo_ML.png";
import logoML2x from "../../assets/Logo_ML@2x.png";
import './Search.scss';

export const Search = () => {
    const location = useLocation();
    const searchQueryParam = location.search.split('=')[1]; 
    const [searchText, setSearchText] = useState(searchQueryParam || '');
    const history = useHistory();
    
    const search = () => {
        if (searchText) {
            history.push(`/items?search=${searchText}`)
        }
    }

    const handleKeyPress = (key) => {
        if (key === 'Enter') {
            search();
        }
    }

    const navigateToHome = () => {
        history.push('/');
    }

    return (
        <header className="top-bar">
            <img 
                className="logo"
                alt="logo"
                src={logoML}
                srcSet={`${logoML} 1x, ${logoML2x} 2x`}
                onClick={() => navigateToHome()}
            />
            <input className="search-input" placeholder="Nunca dejes de buscar" onChange={(event) => setSearchText(event.target.value)} onKeyPress={(event) => handleKeyPress(event.key)}/>
            <button className="search-button" onClick={() => search()}>
                <img 
                    src={searchIcon}
                    alt="search_icon"
                    srcSet={`${searchIcon} 1x, ${searchIcon2x} 2x`}
                />
            </button>
        </header>
    )
}