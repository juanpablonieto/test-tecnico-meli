import React, { useEffect, useState } from 'react';
import { endpoint } from '../../constants/endpoint';
import { useLocation } from 'react-router-dom';
import { ItemResult } from './ItemResult/ItemResult';
import { Breadcrumb } from './Breadcrumb/Breadcrumb';
import './ResultsPage.scss';
import { adaptResults } from '../../adapters/ResultsAdapter';
import { Loading } from '../Loading/Loading';

export const ResultsPage = () => {
    const location = useLocation();
    let search = location.search.split('=')[1]; // get search queryparam value
    const [data, setData] = useState({});
    const [isSearching, setIsSearching] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsSearching(true);
                const response = await fetch(`${endpoint}/api/items?q=${search}`,
                    {
                        method: 'GET',
                        mode: 'cors'
                    });
                let data = await response.json();
                data = adaptResults(data);
                setData(data);
                setIsSearching(false);
            } catch (error) {
                console.error(error);
                setData({})
                setIsSearching(false);
            }
        }
        fetchData();
    }, [search])


    return (
        <>
            {isSearching
                ? <Loading text={'resultados'}/>
                : (
                    <>
                        <Breadcrumb className="breadcrumbs" breadcrumbs={data.categories} />
                        <div className="result-items">
                            { data.items.length
                                ? data.items.map((item, index) => (
                                    <ItemResult
                                        key={index}
                                        data={item}
                                    />
                                ))
                                : <div className="no-results">{`No hay resultados 
                                :(`}</div>
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}
