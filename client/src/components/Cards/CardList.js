import React, { useState, useEffect } from 'react';
import Card from './Card';

const CardList = ({ className='', popularMovies=false, topSeries=false, popularSeries=false, search=false, query='' } = {}) => {
    const [cards, setCards] = useState(new Array(20).fill());
    const [error, setError] = useState('');

    useEffect(() => {
        const getURL = (page=1) => {
            const key = process.env.REACT_APP_MOVIE_KEY;
    
            let url = 'https://api.themoviedb.org/3';
            if (popularMovies) url += `/movie/popular?api_key=${key}&language=en-US&page=${page}`;
            else if (topSeries) url += `/tv/top_rated?api_key=${key}&language=en-US&page=${page}`;
            else if (popularSeries) url += `/tv/popular?api_key=${key}&language=en-US&page=${page}`;
            else if (search) url += `/search/multi?api_key=${key}&language=en-US&page=${page}&query=${query}&page=1&include_adult=false`;
            else url += `/movie/now_playing?api_key=${key}&language=en-US&page=${page}`;
            return url;
        }

        const callApi = async () => {
            try {
                const res = await fetch(getURL(), {
                    method: 'GET',
                });

                // const results = await res.json();
                const { results } = await res.json();
                // console.log(results);
                if (!results) {
                    setCards([]);
                    throw new Error("Unable to retrieve data");
                }
                setCards(results);
            } catch (e) {
                console.log(e);
                if (search && !query) setError('Please provide a search term');
                else setError('Data Retrieval Error');
            }
            
        }

        callApi();
    }, [setCards, popularMovies, topSeries, popularSeries, search, query]);

    return (
        <div className={`card-list ${className}`}>
            {cards.length > 0 ? cards.map((card, i) => { return <Card { ...card } key={i} /> }) : <p>{error}</p>}
        </div>
    )
}

export default CardList;