import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../Frame/Frame';
import CardList from '../Cards/CardList';

const User = () => {
    return (
        <Frame>
            <section className="user--section">
                <Link to="#likes" className="user--link"><h2 className="user--title">Likes</h2></Link>
                <CardList info="likes" />
            </section>
            <section className="user--section">
                <Link to="#dislikes" className="user--link"><h2 className="user--title">Dislikes</h2></Link>
                <CardList info="dislikes" />
            </section>
            <section className="user--section">
                <Link to="#favorites" className="user--link"><h2 className="user--title">Favorites</h2></Link>
                <CardList info="favorites" />
            </section>
        </Frame>
    )
}

export default User;