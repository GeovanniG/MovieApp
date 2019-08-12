import React from 'react';
import Frame from '../Frame/Frame';
import CardList from '../Cards/CardList';
import Aside from './Aside';
import loggedInConnect from '../../stores/loggedIn';

const HomePage = ({ loggedIn }) => {
    return (
        <Frame>
            <section className="home-section">
                {loggedIn && <span className="home-section__aside">
                                <Aside />
                            </span>
                }
                <span className="home-section__card-list">
                    <CardList  />
                </span>
            </section>
        </Frame>
    )
}

const mapStateToProps = ({ loggedIn }) => {
    return {
        loggedIn,
    };
}

const mapDispatchToProps = (dispatchLoggedIn) => {
    return {};
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(HomePage)