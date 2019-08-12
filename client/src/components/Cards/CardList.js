import React, { useState, useEffect } from 'react';
import Card from './Card';
import loggedInConnect from '../../stores/loggedIn';

const CardList = ({ className='', id, popularMovies=false, topSeries=false, popularSeries=false, search=false, query='', info='' } = {}) => {
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

        const callServer = async (info) => {
            try {
                const res = await fetch(`/user/${id}/${info}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const body = await res.json();
                if (body && body.filmsInfo) setCards(body.filmsInfo);
                else setError(`No ${info} to display`)
            } catch (e) {
                setError(`Unable to retreive ${info}`);
            }
        }

        const callApi = async () => {
            try {
                const res = await fetch(getURL(), {
                    method: 'GET',
                });

                const { results } = await res.json();
                if (!results) {
                    setCards([]);
                    throw new Error("Unable to retrieve data");
                }
                setCards(results);
            } catch (e) {
                if (search && !query) setError('Please provide a search term');
                else setError('Data Retrieval Error');
            }
        }
        if (info) callServer(info);
        else callApi();
    }, [setCards, popularMovies, topSeries, popularSeries, search, query, id, info]);

    return (
        <div className={`card-list ${className}`}>
            {cards.length > 0 ? cards.map((card, i) => { return <Card { ...card } key={i} /> }) : <p>{error}</p>}
        </div>
    )
}

const mapStateToProps = ({ id }) => {
    return {
        id
    };
}

const mapDispatchToProps = (dispatchLoggedIn) => {
    return {};
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(CardList);
// export default CardList;