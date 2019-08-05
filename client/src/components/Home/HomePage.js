import React from 'react';
// import { withRouter } from 'react-router-dom';
import Frame from '../Frame/Frame';
import CardList from '../Cards/CardList';
import Aside from './Aside';

const HomePage = () => {
    return (
        <Frame>
            <section className="home-section">
                <span className="home-section__aside">
                    <Aside />
                </span>
                <span className="home-section__card-list">
                    <CardList  />
                </span>
            </section>
        </Frame>
    )
}

// export default withRouter(HomePage);
export default HomePage;