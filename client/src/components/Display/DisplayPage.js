import React from 'react';
import Frame from '../Frame/Frame';
import CardList from '../Cards/CardList';

const DisplayPage = ({ popularMovies=false, topSeries=false, popularSeries=false, search=false, query='' }) => {
    return (
        <Frame>
            <CardList popularMovies={popularMovies} topSeries={topSeries} popularSeries={popularSeries} search={search} query={query} />
        </Frame>
    )
}

export default DisplayPage;